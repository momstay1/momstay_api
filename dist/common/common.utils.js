"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonUtils = void 0;
const axios_1 = require("@nestjs/axios");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const constants_1 = require("../users/constants");
exports.commonUtils = {
    getConstants: (str) => {
        let constants;
        switch (str) {
            case 'user':
                constants = constants_1.usersConstant;
                break;
        }
        return constants;
    },
    getPrefix: (str) => {
        return str.split('_')[0];
    },
    addPrefix: (prefix, array) => {
        const arr = {};
        for (const key in array) {
            arr[prefix + '_' + key] = array[key];
        }
        return arr;
    },
    removePrefix: (str) => {
        const strArr = str.split('_');
        delete strArr[0];
        return strArr.filter((element) => element != null).join('_');
    },
    sanitizeEntity: (array, privateElement) => {
        const arr = {};
        for (const key in array) {
            if ((0, lodash_1.isObject)(array[key]) &&
                !key.includes('createdAt') &&
                !key.includes('updatedAt') &&
                !key.includes('shooting_day')) {
                arr[key] = exports.commonUtils.sanitizeEntity(array[key], privateElement);
            }
            else {
                if (privateElement.indexOf(key) >= 0) {
                    delete array[key];
                }
                else {
                    const removePrefixKey = exports.commonUtils.removePrefix(key);
                    arr[removePrefixKey] = array[key];
                }
            }
        }
        return arr;
    },
    setupSwagger(app) {
        const options = new swagger_1.DocumentBuilder()
            .setTitle('맘스테이 API Docs')
            .setVersion('v1.0.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api-docs', app, document, {
            swaggerOptions: {
                docExpansion: 'none',
            },
        });
    },
    searchSplit(search) {
        const where = {};
        if (search) {
            search = (0, lodash_1.isArray)(search) ? search : [search];
            (0, lodash_1.map)(search, (obj) => {
                if (obj) {
                    const key_val = obj.split(':');
                    if (key_val[1].indexOf(',') === -1) {
                        where[key_val[0]] = key_val[1];
                    }
                    else {
                        where[key_val[0]] = key_val[1].split(',');
                    }
                }
            });
        }
        return where;
    },
    orderSplit(order, alias) {
        let order_by = {};
        if (order) {
            const order_arr = order.split(':');
            if (alias && order_arr[0].indexOf('.') === -1) {
                order_by[alias + '.' + order_arr[0]] = order_arr[1];
            }
            else {
                order_by[order_arr[0]] = order_arr[1];
            }
        }
        return order_by;
    },
    async authCheck(auth, groupId) {
        return auth.includes(groupId);
    },
    calcTax(price, persent) {
        let tax = +persent.replace('%', '');
        tax = tax / 100;
        const calcTax = (price * tax).toFixed();
        return +calcTax;
    },
    createCode() {
        return Math.random().toString(36).substring(2, 13);
    },
    generateRandomString(num) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    generateRandomNumber(num) {
        return Math.random()
            .toString()
            .substring(2, num + 2);
    },
    isMobile(agent) {
        const mobileStr = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|iPad/i;
        return mobileStr.test(agent) ? 'mobile' : 'pc';
    },
    getArrayKey(arr, pks, is_push) {
        const result = {};
        let third_pk;
        let sub_pk;
        let pk;
        if ((0, lodash_1.isArray)(pks)) {
            third_pk = pks[2];
            sub_pk = pks[1];
            pk = pks[0];
        }
        for (const key in arr) {
            const _pk = arr[key][pk];
            const _sub_pk = (0, lodash_1.get)(arr, [key, sub_pk], '');
            const _third_pk = (0, lodash_1.get)(arr, [key, third_pk], '');
            if (!result[_pk]) {
                result[_pk] = {};
            }
            if (is_push) {
                if (third_pk) {
                    if (!result[_pk][_sub_pk])
                        result[_pk][_sub_pk] = {};
                    result[_pk][_sub_pk][_third_pk] = arr[key];
                }
                else if (sub_pk) {
                    if (!result[_pk][_sub_pk])
                        result[_pk][_sub_pk] = [];
                    result[_pk][_sub_pk].push(arr[key]);
                }
                else {
                    if (!(0, lodash_1.isArray)(result[_pk]))
                        result[_pk] = [];
                    result[_pk].push(arr[key]);
                }
            }
            else {
                if (third_pk) {
                    if (!result[_pk][_sub_pk])
                        result[_pk][_sub_pk] = {};
                    result[_pk][_sub_pk][_third_pk] = arr[key];
                }
                else if (sub_pk) {
                    if (!result[_pk][_sub_pk])
                        result[_pk][_sub_pk] = {};
                    result[_pk][_sub_pk] = arr[key];
                }
                else {
                    result[_pk] = arr[key];
                }
            }
        }
        return result;
    },
    getStatus(key) {
        const data = {};
        data['momstay_url'] = 'https://momstay.net';
        data['momstay_admin_url'] = 'http://momstay_admin.cf148.reconers.com';
        data['tax'] = 10;
        data['fee'] = 5;
        data['order_status'] = {
            waitingForPayment: 1,
            paymentCompleted: 2,
            preparingForDelivery: 3,
            shipping: 4,
            purchaseConfirmation: 6,
            cancellationRequest: 7,
            cancellationCompleted: 8,
            returnRequest: 9,
            returnComplete: 10,
            exchangeRequest: 11,
            exchangeComplete: 12,
        };
        data['order_status_text'] = {
            1: '',
            2: '결제 대기',
            3: '',
            4: '결제 완료',
            8: '결제 취소',
        };
        data['order_product_status_text'] = {
            2: '결제 대기',
            4: '결제 완료',
            8: '결제 취소',
        };
        data['user_status_text'] = {
            0: '회원 삭제',
            1: '회원 미인증',
            2: '회원 등록',
            5: '회원 휴면',
            9: '회원 탈퇴',
        };
        data['user_language_text'] = {
            ko: '한국어',
            en: '영어',
            jp: '일본어',
            'zh-CN': '중국어',
        };
        data['board_status_text'] = {
            0: '삭제',
            1: '미등록',
            2: '등록',
            3: '답변대기',
            4: '답변완료',
        };
        data['reservation_status_text'] = {
            1: '예약 대기',
            2: '예약 승인',
            3: '입주 확정',
            4: '예약 취소',
            5: '예약 거부',
        };
        data['review_status_text'] = {
            1: '미등록',
            2: '등록',
        };
        data['membership_status_text'] = {
            1: '확인대기',
            2: '확인완료',
            3: '종료',
        };
        data['product_type_text'] = {
            1: '하숙집',
            2: '쉐어하우스',
            3: '게스트하우스',
            4: '홈스테이',
        };
        data['product_status_text'] = {
            0: '작성중',
            1: '미등록',
            2: '등록',
        };
        data['product_membership_text'] = {
            0: '-',
            1: '사용',
        };
        data['product_option_status_text'] = {
            0: '작성중',
            1: '미등록',
            2: '등록',
        };
        data['product_option_stayStatus_text'] = {
            1: '공실',
            2: '만실',
        };
        data['app_topic'] = {
            all: 'all',
            marketing: 'marketing',
            service: 'service',
            admin: 'admin',
        };
        return (0, lodash_1.get)(data, key, '');
    },
    isAdmin(groupId) {
        return ['root', 'admin'].includes(groupId);
    },
    isRoot(groupId) {
        return ['root'].includes(groupId);
    },
    langValue(lang) {
        let result = '';
        switch (lang) {
            case 'eng':
            case 'en':
                result = 'Eng';
                break;
            case 'jp':
            case 'ja':
                result = 'Jpn';
                break;
            case 'ch':
            case 'cn':
            case 'zh-CN':
                result = 'Chn';
                break;
        }
        return result;
    },
    formatPrice(price) {
        return new Intl.NumberFormat().format(price);
    },
    stringNumberToInt(stringNumber) {
        return parseInt(stringNumber.replace(/,/g, ''));
    },
    calcExchangeRate(price, exchange_rate) {
        const dollor = Math.floor((price / exchange_rate) * 100) / 100;
        return dollor;
    },
    langChk(lang) {
        let result = 'ko';
        switch (lang) {
            case 'eng':
            case 'en':
                result = 'en';
                break;
            case 'jp':
            case 'ja':
                result = 'jp';
                break;
            case 'ch':
            case 'cn':
            case 'zh-CN':
                result = 'ch';
                break;
        }
        return result;
    },
    async getResponse(url, headers) {
        const http = new axios_1.HttpService;
        const headersRequest = (0, lodash_1.merge)({ 'Content-Type': 'application/json' }, headers);
        const response = await (0, rxjs_1.firstValueFrom)(http.get(url, {
            headers: headersRequest,
        }));
        return response;
    },
    async postResponse(url, headers, data) {
        const http = new axios_1.HttpService;
        const headersRequest = (0, lodash_1.merge)({ 'Content-Type': 'application/json' }, headers);
        const response = await (0, rxjs_1.firstValueFrom)(http.post(url, JSON.stringify(data), {
            headers: headersRequest,
        }));
        return response;
    },
};
//# sourceMappingURL=common.utils.js.map