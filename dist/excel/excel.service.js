"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const common_1 = require("@nestjs/common");
const XLSX = require("xlsx");
const path = require("path");
const moment = require("moment");
const excelSettingsLists = require("./data/excel-lists.json");
const common_constants_1 = require("../common/common.constants");
const common_utils_1 = require("../common/common.utils");
let ExcelService = class ExcelService {
    async createExcel(arrayData, options) {
        const { type, settingsData } = options;
        const file_name = `${type}_${moment().format('YYYYMMDDHHmmss')}.xlsx`;
        let useExcelItems = false;
        const datas = arrayData.results;
        const excelSettings = excelSettingsLists[type].sort(this.compareOrder);
        const excelItems = excelSettings.find((x) => x.items);
        let excelItemsIndex = 0;
        if (excelItems) {
            excelItemsIndex = excelSettings.findIndex((setting) => setting.itemsTable === excelItems.itemsTable);
            useExcelItems = true;
            excelItems.items = excelItems.items.sort(this.compareOrder);
            excelSettings[excelItemsIndex].items = excelItems.items;
        }
        const excelColumns = excelSettings
            .filter((x) => !x.items)
            .map((x) => x.column);
        const excelConvertTo = excelSettings
            .filter((x) => !x.items)
            .map((x) => { var _a; return (_a = x.convertTo) !== null && _a !== void 0 ? _a : ''; });
        let excelData = this.excelDataFactory(datas, {
            type,
            excelColumns,
            excelConvertTo,
            settingsData,
        });
        let mergeOptions = [];
        if (useExcelItems) {
            const excelItemsInfo = this.getExcelItemsInfo(excelItems, excelSettings);
            excelItemsInfo.index = excelItemsIndex;
            const excelItemsData = this.excelItemsDataFactory(datas, {
                type,
                excelItemsInfo,
                settingsData,
            });
            excelData = this.mergeExcelData(excelData, excelItemsData, excelItemsInfo.index);
            if (excelItemsInfo.useMerge) {
                mergeOptions = this.excelMergeOptionsFactory(excelItemsData, {
                    type,
                    mergeStartIndex: excelItemsInfo.index,
                    mergeLastIndex: excelItemsInfo.length,
                    totalColumnLength: excelColumns.length + excelItemsInfo.length,
                });
            }
        }
        const excelHeaderTitle = excelSettings.reduce(this.createExcelHeaderTitle, []);
        const excelHeaderWidth = excelSettings.reduce(this.createExcelHeaderWidth, []);
        excelData.unshift(excelHeaderTitle);
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        worksheet['!cols'] = excelHeaderWidth;
        if (mergeOptions.length > 0) {
            worksheet['!merges'] = mergeOptions;
        }
        const file_path = path.join(common_constants_1.commonContants.defect_excel_path, file_name);
        XLSX.utils.book_append_sheet(workbook, worksheet, type);
        XLSX.writeFile(workbook, file_path);
        return { file_name, file_path };
    }
    compareOrder(a, b) {
        if (a.order === b.order)
            return 0;
        if (a.order > b.order)
            return -1;
        if (a.order < b.order)
            return 1;
    }
    createExcelHeaderTitle(result, setting) {
        if (hasItems(setting))
            result.concat(findItemsAllTitle(result, setting));
        else
            result.push(setting.title);
        return result;
        function findItemsAllTitle(result, subSetting) {
            Array.from(subSetting.items).map((item) => {
                if (hasItems(item))
                    result.concat(findItemsAllTitle(result, item));
                else
                    result.push(item['title']);
                return result;
            });
        }
        function hasItems(obj) {
            return obj.items ? true : false;
        }
    }
    createExcelHeaderWidth(result, setting) {
        if (hasItems(setting))
            result.concat(findItemsAllWidth(result, setting));
        else
            result.push({ wpx: setting.width || 10 });
        return result;
        function findItemsAllWidth(result, itemSetting) {
            Array.from(itemSetting.items).map((item) => {
                if (hasItems(item))
                    result.concat(findItemsAllWidth(result, item));
                else
                    result.push({ wpx: item['width'] || 10 });
                return result;
            });
        }
        function hasItems(obj) {
            return obj.items ? true : false;
        }
    }
    getExcelItemsInfo(data, excelSettings) {
        var _a, _b, _c, _d, _e;
        return {
            key: (_a = data.itemsTable) !== null && _a !== void 0 ? _a : '',
            index: excelSettings.findIndex((setting) => setting.itemsTable === data.itemsTable),
            length: (_b = data.items.length) !== null && _b !== void 0 ? _b : 0,
            columns: (_c = data.items.map((item) => item.column)) !== null && _c !== void 0 ? _c : [],
            convertTo: (_d = data.items.map((item) => { var _a; return (_a = item.convertTo) !== null && _a !== void 0 ? _a : ''; })) !== null && _d !== void 0 ? _d : [],
            useMerge: (_e = data.useMerge) !== null && _e !== void 0 ? _e : true,
        };
    }
    excelDataFactory(datas, options) {
        const { type, excelColumns, excelConvertTo, settingsData } = options;
        switch (type) {
            default:
                return createExcelData(excelColumns, excelConvertTo, settingsData);
        }
        function createExcelData(excelColumns, excelConvertTo, settingsData) {
            return Array.from(datas).map((data) => {
                return excelColumns.map((col, colIndex) => {
                    var _a;
                    let result;
                    if (col.includes('.')) {
                        result = getExcelDataFromEntity(data, col, settingsData);
                    }
                    else {
                        result = (_a = data[col]) !== null && _a !== void 0 ? _a : '';
                    }
                    if (result !== '') {
                        if (excelConvertTo[colIndex]) {
                            result = common_utils_1.commonUtils.getStatus([excelConvertTo[colIndex]])[result];
                        }
                    }
                    return result;
                });
            });
        }
        function getExcelDataFromEntity(data, col, settingsData) {
            let splitCol = col.split('.');
            if (splitCol[0] === 'custom') {
                return excelDataCustom();
            }
            return splitCol.reduce((acc, cur, index) => {
                var _a, _b;
                if (index === 0) {
                    acc = (_a = data[cur]) !== null && _a !== void 0 ? _a : '';
                }
                else {
                    acc = (_b = acc[cur]) !== null && _b !== void 0 ? _b : '';
                }
                return acc;
            }, '');
            function excelDataCustom() {
                let customCol = splitCol[1];
                switch (customCol) {
                    case 'monthPrice':
                        const { minPrice, maxPrice } = getMinMaxPrice(data['productOption']);
                        const formatMinPrice = common_utils_1.commonUtils.formatPrice(minPrice);
                        const formatMaxPrice = common_utils_1.commonUtils.formatPrice(maxPrice);
                        return `${formatMinPrice} ~ ${formatMaxPrice} 원`;
                    case 'priceAddUnit':
                        const formatPriceMonth = common_utils_1.commonUtils.formatPrice(data['priceMonth']);
                        return `${formatPriceMonth}원`;
                    case 'mebershipSelectedPrice':
                        const selectedPrice = getMembershipPrice(data['month'], settingsData);
                        const formatSelectedPrice = common_utils_1.commonUtils.formatPrice(selectedPrice);
                        return `${formatSelectedPrice}원 (${data['month']}개월)`;
                    case 'reviewStar':
                        return `${data['star'] / 2}점`;
                }
            }
            function getMinMaxPrice(array) {
                let minPrice = 0;
                let maxPrice = 0;
                array.map((obj) => {
                    if (minPrice === 0)
                        minPrice = obj.priceMonth;
                    if (maxPrice === 0)
                        maxPrice = obj.priceMonth;
                    if (minPrice > obj.priceMonth)
                        minPrice = obj.priceMonth;
                    if (maxPrice < obj.priceMonth)
                        maxPrice = obj.priceMonth;
                });
                return { minPrice, maxPrice };
            }
            function getMembershipPrice(month, settingsData) {
                var _a;
                return ((_a = settingsData[`membership_price_discount_${month}`].set_value) !== null && _a !== void 0 ? _a : 0);
            }
        }
    }
    excelItemsDataFactory(datas, options) {
        const { type, excelItemsInfo, settingsData } = options;
        switch (type) {
            default:
                return createExcelItemsData(excelItemsInfo, settingsData);
        }
        function createExcelItemsData(excelItemsInfo, settingsData) {
            const tableName = excelItemsInfo.key;
            const excelItemsConvertTo = excelItemsInfo.convertTo;
            return Array.from(datas).map((data, index) => {
                let result = [];
                let itemsExcelData;
                if (!Array.isArray(data[tableName])) {
                    data[tableName] = [data[tableName]];
                }
                itemsExcelData = data[tableName].map((itemData) => {
                    return excelItemsInfo.columns.map((col, colIndex) => {
                        var _a;
                        let result = '';
                        if (col.includes('.')) {
                            result = getExcelItemsDataFromEntity(data, itemData, col, settingsData);
                        }
                        else {
                            result = (_a = itemData[col]) !== null && _a !== void 0 ? _a : '';
                        }
                        if (result) {
                            if (excelItemsConvertTo[colIndex]) {
                                result = common_utils_1.commonUtils.getStatus(excelItemsConvertTo[colIndex])[result];
                            }
                        }
                        return result;
                    });
                });
                itemsExcelData.map((x) => {
                    result.push(x);
                });
                return result;
            });
        }
        function getExcelItemsDataFromEntity(data, itemData, col, settingsData) {
            let splitCol = col.split('.');
            if (splitCol[0] === 'custom') {
                return excelItemsDataCustom();
            }
            return splitCol.reduce((acc, cur, index) => {
                var _a, _b;
                if (index === 0) {
                    acc = (_a = data[cur]) !== null && _a !== void 0 ? _a : '';
                }
                else {
                    acc = (_b = acc[cur]) !== null && _b !== void 0 ? _b : '';
                }
                return acc;
            }, '');
            function excelItemsDataCustom() {
                let customCol = splitCol[1];
                switch (customCol) {
                    case 'orderPayPrice':
                        const formatPayPrice = common_utils_1.commonUtils.formatPrice(itemData['payPrice']);
                        return `${formatPayPrice}원`;
                }
            }
        }
    }
    mergeExcelData(excelData, excelItemsData, insertIndex) {
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
    excelMergeOptionsFactory(excelData, options) {
        const { type, mergeStartIndex, mergeLastIndex, totalColumnLength } = options;
        switch (type) {
            case 'order':
                return [];
            default:
                return createMergeOptions(mergeStartIndex, mergeLastIndex, totalColumnLength);
        }
        function createMergeOptions(mergeExceptionStartIndex, mergeExceptionLastIndex, totalColumnLength) {
            let startRowIdx = 1;
            let currentRowIdx = startRowIdx;
            return excelData.reduce((result, currentData) => {
                let startRowIdx = currentRowIdx;
                let endRowIdx = currentRowIdx + currentData.length - 1;
                currentRowIdx = currentRowIdx + currentData.length;
                if (currentData.length < 2)
                    return result;
                let mergeOptions = Array.from({ length: totalColumnLength })
                    .filter((x, index) => index < mergeExceptionStartIndex ||
                    index > mergeExceptionLastIndex + 2)
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
};
ExcelService = __decorate([
    (0, common_1.Injectable)()
], ExcelService);
exports.ExcelService = ExcelService;
//# sourceMappingURL=excel.service.js.map