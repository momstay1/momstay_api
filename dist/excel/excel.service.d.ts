export declare class ExcelService {
    createExcel(arrayData: any, options: any): Promise<{
        file_name: string;
        file_path: string;
    }>;
    private compareOrder;
    private createExcelHeaderTitle;
    private createExcelHeaderWidth;
    private getExcelItemsInfo;
    private excelDataFactory;
    private excelItemsDataFactory;
    private mergeExcelData;
    private excelMergeOptionsFactory;
}
