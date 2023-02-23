"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonUtils = void 0;
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
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
        return strArr
            .filter(element => element != null)
            .join('_');
    },
    sanitizeEntity: (array, privateElement) => {
        const arr = {};
        for (const key in array) {
            if ((0, lodash_1.isObject)(array[key]) && (!key.includes('createdAt') && !key.includes('updatedAt') && !key.includes('shooting_day'))) {
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
        swagger_1.SwaggerModule.setup('api-docs', app, document);
    },
    searchSplit(search) {
        const where = {};
        if (search) {
            search = (0, lodash_1.isArray)(search) ? search : [search];
            (0, lodash_1.map)(search, (obj) => {
                if (obj) {
                    const key_val = obj.split(':');
                    if (key_val[1].indexOf(",") === -1) {
                        where[key_val[0]] = key_val[1];
                    }
                    else {
                        where[key_val[0]] = key_val[1].split(",");
                    }
                }
            });
        }
        return where;
    },
    async authCheck(auth, groups) {
        return (0, lodash_1.filter)(groups, (o) => { return auth.includes(o.id); });
    },
    createCode() {
        return Math.random().toString(36).substr(2, 11);
    },
    isMobile(agent) {
        const mobileStr = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|iPad/i;
        return mobileStr.test(agent) ? "mobile" : "pc";
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
                    if ((0, lodash_1.isObject)(result[_pk]))
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
};
//# sourceMappingURL=common.utils.js.map