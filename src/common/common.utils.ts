import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { filter, get, isArray, isEmpty, isObject, map } from "lodash";
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
  },
  calcTax(price: number, persent: string): number {
    let tax = +persent.replace('%', '');
    tax = tax / 100;

    // 자바스크립트 숫자 계산상 부동소수점 계산으로 부가세 계산시 소수점 발생으로 fixed 사용
    const calcTax = (price * tax).toFixed();

    return +calcTax;
  },
  createCode(): string {
    return Math.random().toString(36).substr(2, 11);
  },
  generateRandomString(num): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },
  generateRandomNumber(num): string {
    return Math.random().toString().substr(2, num);
  },
  isMobile(agent: string): string {
    const mobileStr = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|iPad/i;
    return mobileStr.test(agent) ? "mobile" : "pc";
  },
  getArrayKey(arr: any, pks: string | string[], is_push: boolean) {
    const result = {};

    let third_pk;
    let sub_pk;
    let pk;
    if (isArray(pks)) {
      third_pk = pks[2];
      sub_pk = pks[1];
      pk = pks[0];
    }

    for (const key in arr) {
      const _pk = arr[key][pk];
      const _sub_pk = get(arr, [key, sub_pk], '');
      const _third_pk = get(arr, [key, third_pk], '');

      if (!result[_pk]) {
        result[_pk] = {};
      }

      if (is_push) {
        if (third_pk) {
          if (!result[_pk][_sub_pk]) result[_pk][_sub_pk] = {};

          result[_pk][_sub_pk][_third_pk] = arr[key];
        } else if (sub_pk) {
          if (!result[_pk][_sub_pk]) result[_pk][_sub_pk] = [];

          result[_pk][_sub_pk].push(arr[key]);
        } else {
          if (isObject(result[_pk])) result[_pk] = [];

          result[_pk].push(arr[key]);
        }
      } else {
        if (third_pk) {
          if (!result[_pk][_sub_pk]) result[_pk][_sub_pk] = {};

          result[_pk][_sub_pk][_third_pk] = arr[key];
        } else if (sub_pk) {
          if (!result[_pk][_sub_pk]) result[_pk][_sub_pk] = {};

          result[_pk][_sub_pk] = arr[key];
        } else {
          result[_pk] = arr[key];
        }
      }
    }
    return result;
  },
  getStatus(key: string | string[]) {
    const data = {};

    // 부가세
    data['tax'] = 10;
    // 맘스테이 수수료
    data['fee'] = 5;

    return get(data, key, '');
  }
};
