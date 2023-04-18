import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { filter, get, isArray, isEmpty, isObject, map } from 'lodash';
import { usersConstant } from 'src/users/constants';

export const commonUtils = {
  getConstants: (str: string): any => {
    let constants;
    switch (str) {
      case 'user':
        constants = usersConstant;
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
    return strArr.filter((element) => element != null).join('_');
  },
  sanitizeEntity: (array, privateElement): any[] => {
    const arr: any = {};
    for (const key in array) {
      if (
        isObject(array[key]) &&
        !key.includes('createdAt') &&
        !key.includes('updatedAt') &&
        !key.includes('shooting_day')
      ) {
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
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        docExpansion: 'none',
      },
    });
  },
  searchSplit(search: string[]) {
    const where = {};
    if (search) {
      search = isArray(search) ? search : [search];
      map(search, (obj) => {
        if (obj) {
          const key_val = obj.split(':');
          if (key_val[1].indexOf(',') === -1) {
            where[key_val[0]] = key_val[1];
          } else {
            where[key_val[0]] = key_val[1].split(',');
          }
        }
      });
    }

    return where;
  },
  orderSplit(order: string, alias: string) {
    let order_by = {};
    if (order) {
      const order_arr = order.split(':');
      if (alias && order_arr[0].indexOf('.') === -1) {
        order_by[alias + '.' + order_arr[0]] = order_arr[1];
      } else {
        order_by[order_arr[0]] = order_arr[1];
      }
    }

    return order_by;
  },
  async authCheck(auth, groupId) {
    return auth.includes(groupId);
  },
  calcTax(price: number, persent: string): number {
    let tax = +persent.replace('%', '');
    tax = tax / 100;

    // 자바스크립트 숫자 계산상 부동소수점 계산으로 부가세 계산시 소수점 발생으로 fixed 사용
    const calcTax = (price * tax).toFixed();

    return +calcTax;
  },
  createCode(): string {
    return Math.random().toString(36).substring(2, 13);
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
    return Math.random()
      .toString()
      .substring(2, num + 2);
  },
  isMobile(agent: string): string {
    const mobileStr =
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|iPad/i;
    return mobileStr.test(agent) ? 'mobile' : 'pc';
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
          if (!isArray(result[_pk])) result[_pk] = [];

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
    // 1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정, 7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료
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
    // order 상태 텍스트
    data['order_status_text'] = {
      1: '결제대기',
      2: '결제완료',
      3: '배송준비',
      4: '배송중(호스트 승인)',
      6: '구매확정(입주 확정)',
    };
    // order product 상태 텍스트
    data['order_product_status_text'] = {
      1: '결제대기',
      2: '결제완료',
      3: '배송준비',
      4: '배송중(호스트 승인)',
      6: '구매확정(입주 확정)',
    };
    // user 상태 텍스트
    data['user_status_text'] = {
      0: '회원 삭제',
      1: '회원 미인증',
      2: '회원 등록',
      5: '회원 휴면',
      9: '회원 탈퇴',
    };
    // user 가입 언어 텍스트
    data['user_language_text'] = {
      ko: '한국어',
      en: '영어',
      jp: '일본어',
      'zh-CN': '중국어',
    };
    // board contents 상태 텍스트
    data['board_status_text'] = {
      0: '삭제',
      1: '미등록',
      2: '등록',
      3: '답변대기',
      4: '답변완료',
    };
    // 방문 예약 상태 텍스트
    data['reservation_status_text'] = {
      1: '예약대기',
      2: '예약승인',
      3: '예약확정',
      4: '예약취소',
      5: '예약거부',
    };
    // 후기 등록 텍스트
    data['review_status_text'] = {
      1: '미등록',
      2: '등록',
    };
    // 멤버십 상태 텍스트
    data['membership_status_text'] = {
      1: '신청',
      2: '승인',
      3: '종료',
    };
    // 숙소 유형 텍스트
    data['product_type_text'] = {
      1: '하숙집',
      2: '쉐어하우스',
      3: '게스트하우스',
      4: '홈스테이',
    };
    // 숙소 게시 상태 텍스트
    data['product_status_text'] = {
      0: '미등록',
      1: '미사용',
      2: '사용',
    };
    // 숙소 멤버십 이용상태 텍스트
    data['product_membership_text'] = {
      0: '-',
      1: '이용',
    };
    // 방 게시 상태 텍스트
    data['product_option_status_text'] = {
      0: '미등록',
      1: '미사용',
      2: '사용',
    };
    // 방 투숙 상태 텍스트
    data['product_option_stayStatus_text'] = {
      1: '공실',
      2: '만실',
    };

    // 앱 푸시 구독(topic) 타입
    data['app_topic'] = {
      all: 'all', // 전체 푸시 발송
      marketing: 'marketing', // 마케팅 동의한 회원만 발송
      service: 'service', // 서비스 동의한 회원만 발송
      admin: 'admin', // 관리자에게만 발송
    };

    return get(data, key, '');
  },
  isAdmin(groupId: string) {
    return ['root', 'admin'].includes(groupId);
  },
  isRoot(groupId: string) {
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
};
