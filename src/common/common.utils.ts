import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { filter, isArray, isObject, map } from "lodash";
import { usersConstant } from "src/users/constants";

export const commonUtils = {
  getConstants: (str: string): any => {
    let constants;
    switch (str) {
      case 'user':
        constants = usersConstant
        break;
    }
    return constants;
  },
  getPrefix: (str: string): string => {
    return str.split('_')[0];
  },
  addPrefix: (prefix: string, array: any): any => {
    const arr: any = {};
    for (const key in array) {
      arr[prefix + '_' + key] = array[key];
    }
    return arr;
  },
  removePrefix: (str: string): string => {
    const strArr = str.split('_');
    delete strArr[0];
    return strArr
      .filter(element => element != null)
      .join('_');
  },
  sanitizeEntity: (array, privateElement): any[] => {
    const arr: any = {};
    for (const key in array) {
      if (isObject(array[key]) && (!key.includes('createdAt') && !key.includes('updatedAt') && !key.includes('shooting_day'))) {
        arr[key] = commonUtils.sanitizeEntity(array[key], privateElement);
      } else {
        if (privateElement.indexOf(key) >= 0) {
          delete array[key];
        } else {
          const removePrefixKey = commonUtils.removePrefix(key);
          arr[removePrefixKey] = array[key];
        }
      }
    }
    return arr;
  },
  setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('맘스테이 API Docs')
      .setVersion('v1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  },
  searchSplit(search: string[]) {
    const where = {};
    if (search) {
      search = isArray(search) ? search : [search];
      map(search, (obj) => {
        if (obj) {
          const key_val = obj.split(':');
          if (key_val[1].indexOf(",") === -1) {
            where[key_val[0]] = key_val[1];
          } else {
            where[key_val[0]] = key_val[1].split(",");
          }
        }
      });
    }

    return where;
  },
  async authCheck(auth, groups) {
    return filter(groups, (o) => { return auth.includes(o.id) });
  }
};
