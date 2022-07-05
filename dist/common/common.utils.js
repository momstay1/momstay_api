"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonUtils = void 0;
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
exports.commonUtils = {
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
            if ((0, lodash_1.isObject)(array[key]) && (!key.includes('createdAt') && !key.includes('updatedAt'))) {
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
            .setTitle('대관모아 API Docs')
            .setVersion('v1.0.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api-docs', app, document);
    }
};
//# sourceMappingURL=common.utils.js.map