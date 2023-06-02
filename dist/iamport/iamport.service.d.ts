export declare class IamportService {
    constructor();
    getBanks(): Promise<import("iamport-rest-client-nodejs/dist/Interfaces").IamportData>;
    getToken(): Promise<any>;
    getCertification(imp_uid: string): Promise<any>;
    delCertification(imp_uid: string): Promise<any>;
    getPaymentByImpUid(imp_uid: string): Promise<any>;
    paymentCancel(imp_uid: string, cancelPrice: number, reason: string): Promise<any>;
    iamportIPVerification(req_ip: string): Promise<boolean>;
}
