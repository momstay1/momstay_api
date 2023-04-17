import { Injectable } from '@nestjs/common';

import * as XLSX from 'xlsx';
import * as path from 'path';
import * as moment from 'moment';

import * as excelSettingsLists from './data/excel-lists.json';

import { commonContants } from 'src/common/common.constants';
import { commonUtils } from 'src/common/common.utils';

@Injectable()
export class ExcelService {
  async downloadExcel(arrayData, options) {
    const { type } = options;
    const excelName = `${type}_${moment().format('YYYYMMDDHHmmss')}.xlsx`;
    let useExcelItems = false;

    const datas = arrayData.results;
    const excelSettings = excelSettingsLists[type].sort(this.compareOrder); // excel-lists.json
    const excelItems = excelSettings.find((x) => x.items);
    let excelItemsIndex = 0;

    if (excelItems) {
      excelItemsIndex = excelSettings.findIndex(
        (setting) => setting.itemsTable === excelItems.itemsTable,
      );
      useExcelItems = true;
      // items order 기준 정렬
      excelItems.items = excelItems.items.sort(this.compareOrder);
      excelSettings[excelItemsIndex].items = excelItems.items;
    }
    // 엑셀 셀별 매칭되는 값 설정
    // 아이템을 제외한 테이블 컬럼
    const excelColumns = excelSettings
      .filter((x) => !x.items)
      .map((x) => x.column);
    const excelConvertTo = excelSettings
      .filter((x) => !x.items)
      .map((x) => x.convertTo ?? '');

    // 엑셀에 들어갈 데이터
    let excelData = this.excelDataFactory(datas, {
      type,
      excelColumns,
      excelConvertTo,
    });

    // 아이템 관련 설정 정보
    let mergeOptions = [];

    // 아이템 사용 시, 아이템에 해당하는 데이터 추가
    if (useExcelItems) {
      const excelItemsInfo = this.getExcelItemsInfo(excelItems, excelSettings);
      excelItemsInfo.index = excelItemsIndex;

      const excelItemsData = this.excelItemsDataFactory(datas, {
        type,
        excelItemsInfo,
      });

      // 엑셀 데이터, 엑셀 아이템 데이터 합치기
      excelData = this.mergeExcelData(
        excelData,
        excelItemsData,
        excelItemsInfo.index,
      );

      // 병합 옵션
      if (excelItemsInfo.useMerge) {
        mergeOptions = this.excelMergeOptionsFactory(excelItemsData, {
          type,
          mergeStartIndex: excelItemsInfo.index,
          mergeLastIndex: excelItemsInfo.length,
          totalColumnLength: excelColumns.length + excelItemsInfo.length,
        });
      }
    }

    // 엑셀 헤더 설정
    const excelHeaderTitle = excelSettings.reduce(
      this.createExcelHeaderTitle,
      [],
    );
    // 엑셀 헤더 너비 설정
    const excelHeaderWidth = excelSettings.reduce(
      this.createExcelHeaderWidth,
      [],
    );

    // 엑셀 데이터에 엑셀 헤더 삽입
    excelData.unshift(excelHeaderTitle);

    // 엑셀 그리기
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    worksheet['!cols'] = excelHeaderWidth;

    // 엑셀 병합 설정
    if (mergeOptions.length > 0) {
      worksheet['!merges'] = mergeOptions;
    }

    const filePath = path.join(commonContants.defect_excel_path, excelName);
    XLSX.utils.book_append_sheet(workbook, worksheet, type);
    XLSX.writeFile(workbook, filePath);

    return { excelName, filePath };
  }

  // order 값이 클수록 우선순위 높음
  private compareOrder(a, b) {
    if (a.order === b.order) return 0;
    if (a.order > b.order) return -1;
    if (a.order < b.order) return 1;
  }

  private createExcelHeaderTitle(result, setting) {
    if (hasItems(setting)) result.concat(findItemsAllTitle(result, setting));
    else result.push(setting.title);

    return result;

    function findItemsAllTitle(result, subSetting) {
      Array.from(subSetting.items).map((item) => {
        if (hasItems(item)) result.concat(findItemsAllTitle(result, item));
        else result.push(item['title']);

        return result;
      });
    }
    function hasItems(obj) {
      return obj.items ? true : false;
    }
  }

  private createExcelHeaderWidth(result, setting) {
    if (hasItems(setting)) result.concat(findItemsAllWidth(result, setting));
    else result.push({ wpx: setting.width || 10 });

    return result;

    function findItemsAllWidth(result, itemSetting) {
      Array.from(itemSetting.items).map((item) => {
        if (hasItems(item)) result.concat(findItemsAllWidth(result, item));
        else result.push({ wpx: item['width'] || 10 });

        return result;
      });
    }
    function hasItems(obj) {
      return obj.items ? true : false;
    }
  }

  /**
   * 엑셀 설정 json의 items 정보 가져오기
   * @param data 엑셀 설정 json에서 items 데이터
   * @param excelSettings
   * @returns {Object}
   *  - key: items 데이터가 들어갈 배열 이름
   *  - index: excel-lists.json에서 items의 시작 순서
   *  - length: items 크기
   *  - columns: items에서 column만 가져온 배열 값
   *  - convertTo: 데이터를 치환할 경우 사용
   *  - useMerge: items를 제외하고 병합 기능 사용 여부
   */
  private getExcelItemsInfo(
    data,
    excelSettings,
  ): {
    key: string;
    index: number;
    length: number;
    columns: Array<any>;
    convertTo: Array<any>;
    useMerge: boolean;
  } {
    return {
      key: data.itemsTable ?? '',
      index: excelSettings.findIndex(
        (setting) => setting.itemsTable === data.itemsTable,
      ),
      length: data.items.length ?? 0,
      columns: data.items.map((item) => item.column) ?? [],
      convertTo: data.items.map((item) => item.convertTo ?? '') ?? [],
      useMerge: data.useMerge ?? true,
    };
  }

  /**
   * excel-lists.json의 items를 제외한 엑셀에 들어갈 데이터
   * @param datas
   * @param options
   * @returns {Array}
   */
  private excelDataFactory(datas, options) {
    const { type, excelColumns, excelConvertTo } = options;
    switch (type) {
      default:
        return createExcelData(excelColumns, excelConvertTo);
    }
    /**
     * items를 제외한 Excel에 들어갈 데이터 생성
     * @param excelColumns
     * @param excelConvertTo
     * @returns
     */
    function createExcelData(excelColumns, excelConvertTo) {
      return Array.from(datas).map((data) => {
        return excelColumns.map((col, colIndex) => {
          let result;
          if (col.includes('.')) {
            result = getExcelDataFromEntity(data, col);
          } else {
            result = data[col] ?? '';
          }

          if (result) {
            // 치환할 데이터가 있을 경우
            if (excelConvertTo[colIndex]) {
              result = commonUtils.getStatus([excelConvertTo[colIndex]])[
                result
              ];
            }
          }
          return result;
        });
      });
    }

    /**
     * 다른 entity에서 데이터를 뽑아야하거나, data custom이 필요할 경우
     * @param data
     * @param col
     * @returns
     */
    function getExcelDataFromEntity(data, col) {
      let splitCol = col.split('.');
      if (splitCol[0] === 'custom') {
        return excelDataCustom();
      }

      return splitCol.reduce((acc, cur, index) => {
        if (index === 0) {
          acc = data[cur] ?? '';
        } else {
          acc = acc[cur] ?? '';
        }
        return acc;
      }, '');

      function excelDataCustom() {
        switch (splitCol[1]) {
          case 'visitDateTime': // 예약일 + 예약시간
            return `${data['visitDate']} ${data['visitTime']}`;
          case 'monthPrice': // 월별 요금: 최소요금 ~ 최대금액
            const { minPrice, maxPrice } = getMinMaxPrice(
              data['productOption'],
            );
            return `${minPrice} ~ ${maxPrice} 원`;
          case 'priceAddUnit': // 가격 + 금액 단위
            return `${data['price']}원`;
          case 'reviewStar': //
            return `${data['star'] / 2}점`;
        }
      }
      function getMinMaxPrice(array) {
        let minPrice = 0;
        let maxPrice = 0;
        array.map((obj) => {
          if (minPrice === 0) minPrice = obj.priceMonth;
          if (maxPrice === 0) maxPrice = obj.priceMonth;

          // 최소요금 찾기
          if (minPrice > obj.priceMonth) minPrice = obj.priceMonth;
          // 최대요금 찾기
          if (maxPrice < obj.priceMonth) maxPrice = obj.priceMonth;
        });
        return { minPrice, maxPrice };
      }
    }
  }

  /**
   * excel-lists.json의 items에 맞는 엑셀에 들어갈 데이터
   * @param datas
   * @param options
   * @returns
   */
  private excelItemsDataFactory(datas, options) {
    const { type, excelItemsInfo } = options;
    switch (type) {
      default:
        return createExcelItemsData(excelItemsInfo);
    }

    /**
     * ExcelItems에 들어갈 data 생성
     * @param excelItemsInfo
     * @returns
     */
    function createExcelItemsData(excelItemsInfo) {
      const tableName = excelItemsInfo.key;
      const excelItemsConvertTo = excelItemsInfo.convertTo;
      // 엑셀 데이터
      return Array.from(datas).map((data, index) => {
        let result = [];

        // items의 엑셀 데이터
        let itemsExcelData;
        if (!Array.isArray(data[tableName])) {
          data[tableName] = [data[tableName]];
        }

        itemsExcelData = data[tableName].map((itemData) => {
          return excelItemsInfo.columns.map((col, colIndex) => {
            let result = '';
            if (col.includes('.')) {
              result = getExcelItemsDataFromEntity(data, col);
            } else {
              result = itemData[col] ?? '';
            }
            if (result) {
              if (excelItemsConvertTo[colIndex]) {
                result = commonUtils.getStatus(excelItemsConvertTo[colIndex])[
                  result
                ];
              }
            }
            return result;
          });
        });

        // 엑셀 데이터 합치기
        itemsExcelData.map((x) => {
          result.push(x);
        });

        return result;
      });
    }
    /**
     * data의 다른 entity에서 값을 찾아야하거나, custom이 필요한 ExcelItems 데이터들
     * @param data
     * @param col
     * @returns
     */
    function getExcelItemsDataFromEntity(data, col) {
      let splitCol = col.split('.');
      if (splitCol[0] === 'custom') {
        return excelItemsDataCustom();
      }

      return splitCol.reduce((acc, cur, index) => {
        if (index === 0) {
          acc = data[cur] ?? '';
        } else {
          acc = acc[cur] ?? '';
        }
        return acc;
      }, '');

      function excelItemsDataCustom() {
        switch (splitCol[1]) {
          default:
            return '';
        }
      }
    }
  }

  /**
   * 엑셀 시트에서 병합해서 보여주기 위해, excelData와 excelItemsData 합치기
   * @param excelData
   * @param excelItemsData
   * @param insertIndex
   * @returns
   */
  private mergeExcelData(excelData, excelItemsData, insertIndex) {
    return excelItemsData.reduce((result, itemsData, index) => {
      itemsData.map((item) => {
        let copyData = [...excelData[index]];
        insert(copyData, insertIndex, ...item);
        result.push(copyData);
      });

      return result;
    }, []);

    function insert(array, index, ...items) {
      return array.splice(index, 0, ...items);
    }
  }

  /**
   * 엑설 병합 설정 데이터
   * @param excelData
   * @param options
   * @returns
   */
  private excelMergeOptionsFactory(excelData, options) {
    const { type, mergeStartIndex, mergeLastIndex, totalColumnLength } =
      options;

    switch (type) {
      case 'order':
        return [];
      default:
        return createMergeOptions(
          mergeStartIndex,
          mergeLastIndex,
          totalColumnLength,
        );
    }

    /**
     * 엑셀 merge option 생성
     * https://docs.sheetjs.com/docs/solutions/processing#other-properties-1 참고
     * @param mergeExceptionStartIndex 병합 에외할 시작 index
     * @param mergeExceptionLastIndex 병합 에외할 마지막 index
     * @param totalColumnLength items를 제외한 컬럼의 길이
     * @returns
     */
    function createMergeOptions(
      mergeExceptionStartIndex,
      mergeExceptionLastIndex,
      totalColumnLength,
    ) {
      let startRowIdx = 1;
      let currentRowIdx = startRowIdx;

      return excelData.reduce((result, currentData) => {
        let startRowIdx = currentRowIdx;
        let endRowIdx = currentRowIdx + currentData.length - 1;
        currentRowIdx = currentRowIdx + currentData.length;

        // data.length > 1: 병합 대상
        if (currentData.length < 2) return result;

        let mergeOptions = Array.from({ length: totalColumnLength })
          .filter(
            (x, index) =>
              index < mergeExceptionStartIndex ||
              index > mergeExceptionLastIndex + 2,
          )
          .map((x, i) => {
            return {
              s: { r: startRowIdx, c: i },
              e: { r: endRowIdx, c: i },
            };
          });

        return result.concat(mergeOptions);
      }, []);
    }
  }
}
