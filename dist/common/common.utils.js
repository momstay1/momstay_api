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
    }
};
//# sourceMappingURL=common.utils.js.map