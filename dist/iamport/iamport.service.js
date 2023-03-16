"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamportService = void 0;
const common_1 = require("@nestjs/common");
const iamport_rest_client_nodejs_1 = require("iamport-rest-client-nodejs");
const common_utils_1 = require("../common/common.utils");
const config_service_1 = require("../config/config.service");
let iamport;
let iamport_key;
let iamport_secret_key;
let imp_init;
let IamportService = class IamportService {
    constructor() {
        const impConfig = new config_service_1.ConfigService(process.env).getIamportConfig();
        iamport = impConfig.iamport;
        iamport_key = impConfig.iamport_key;
        iamport_secret_key = impConfig.iamport_secret_key;
        imp_init = new iamport_rest_client_nodejs_1.Iamport({
            apiKey: iamport_key,
            apiSecret: iamport_secret_key,
        });
    }
    async getBanks() {
        const { Banks } = iamport_rest_client_nodejs_1.Request;
        const getBanks = Banks.getBanks();
        const banks = await getBanks.request(imp_init);
        return banks.data;
    }
    async getToken() {
        const { Authenticate } = iamport_rest_client_nodejs_1.Request;
        const getToken = Authenticate.getToken({
            imp_key: iamport_key,
            imp_secret: iamport_secret_key
        });
        let token;
        try {
            token = await getToken.request(imp_init);
            token = token.data;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.response.data.message);
        }
        return token;
    }
    async getCertification(imp_uid) {
        const iamport = 'imp65825226';
        const iamport_key = '0568292538093639';
        const iamport_secret_key = 'm89vemChTh78hpGAhHxDlSA2tpk2GAI3ISyXfbe8smhJLYk2FRF0Kg3eFnglXZoGSXE78SgBexk0wF3b';
        const { Certifications } = iamport_rest_client_nodejs_1.Request;
        const getCertification = Certifications.getCertification({
            imp_uid: imp_uid,
        });
        let certification;
        try {
            certification = await getCertification.request(new iamport_rest_client_nodejs_1.Iamport({
                apiKey: iamport_key,
                apiSecret: iamport_secret_key,
            }));
            certification = certification.data;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.response.data.message);
        }
        return certification;
    }
    async delCertification(imp_uid) {
        const { Certifications } = iamport_rest_client_nodejs_1.Request;
        const getCertification = Certifications.deleteCertification({
            imp_uid: imp_uid,
        });
        let certification;
        try {
            certification = await getCertification.request(imp_init);
            certification = certification.data;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.response.data.message);
        }
        return certification;
    }
    async getPaymentByImpUid(imp_uid) {
        const { Payments } = iamport_rest_client_nodejs_1.Request;
        const getByImpUid = Payments.getByImpUid({
            imp_uid: imp_uid,
        });
        let payment;
        try {
            payment = await getByImpUid.request(imp_init);
            payment = payment.data;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.response.data.message);
        }
        console.log({ payment });
        return payment;
    }
    async paymentCancel(imp_uid, cancelPrice, reason) {
        const { Payments } = iamport_rest_client_nodejs_1.Request;
        const cancel_data = {
            imp_uid: imp_uid,
            merchant_uid: '',
            amount: cancelPrice,
            tax_free: null,
            checksum: null,
            reason: reason,
            refund_holder: null,
            refund_bank: null,
            refund_account: null,
        };
        if (common_utils_1.commonUtils.getStatus('tax') > 0) {
        }
        const getByImpUid = Payments.cancel(cancel_data);
        let payment;
        try {
            payment = await getByImpUid.request(imp_init);
            payment = payment.data;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.response.data.message);
        }
        console.log({ payment });
        return payment;
    }
};
IamportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IamportService);
exports.IamportService = IamportService;
//# sourceMappingURL=iamport.service.js.map