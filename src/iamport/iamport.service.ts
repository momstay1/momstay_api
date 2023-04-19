import { Injectable, NotFoundException } from '@nestjs/common';
import { Iamport, Request, Enum } from 'iamport-rest-client-nodejs';
import { commonUtils } from 'src/common/common.utils';
import { ConfigService } from 'src/config/config.service';

let iamport;
let iamport_key;
let iamport_secret_key;
let imp_init;
@Injectable()
export class IamportService {
  constructor() {
    const impConfig = new ConfigService(process.env).getIamportConfig();
    iamport = impConfig.iamport;
    iamport_key = impConfig.iamport_key;
    iamport_secret_key = impConfig.iamport_secret_key;
    imp_init = new Iamport({
      apiKey: iamport_key,
      apiSecret: iamport_secret_key,
    });
  }

  // 모든 은행 정보를 조회 (테스트)
  async getBanks() {
    const { Banks } = Request;
    const getBanks = Banks.getBanks();
    const banks = await getBanks.request(imp_init);
    return banks.data;
  }

  // 아임포트 사용자 인증
  async getToken() {
    const { Authenticate } = Request;
    const getToken = Authenticate.getToken({
      imp_key: iamport_key,
      imp_secret: iamport_secret_key
    });

    let token;
    try {
      token = await getToken.request(imp_init);
      token = token.data;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
    return token;
  }

  // 휴대폰 본인인증 정보 조회
  // 401 에러 인증 토큰이 전달되지 않았거나 유효하지 않은 경우
  // 404 에러 휴대폰 본인인증결과를 찾을 수 없음
  async getCertification(imp_uid: string) {
    // 밀림 아임포트 key정보 (테스트용)
    // const iamport = 'imp65825226';
    // const iamport_key = '0568292538093639';
    // const iamport_secret_key = 'm89vemChTh78hpGAhHxDlSA2tpk2GAI3ISyXfbe8smhJLYk2FRF0Kg3eFnglXZoGSXE78SgBexk0wF3b';
    const { Certifications } = Request;
    const getCertification = Certifications.getCertification({
      imp_uid: imp_uid,
    });

    let certification;
    try {
      certification = await getCertification.request(new Iamport({
        apiKey: iamport_key,
        apiSecret: iamport_secret_key,
      }));
      // certification = await getCertification.request(imp_init);
      certification = certification.data;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
    return certification;
  }

  // 휴대폰 본인인증 정보 삭제
  async delCertification(imp_uid: string) {
    const { Certifications } = Request;
    const getCertification = Certifications.deleteCertification({
      imp_uid: imp_uid,
    });

    let certification;
    try {
      certification = await getCertification.request(imp_init);
      certification = certification.data;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
    return certification;
  }

  // 아임포트 결제 조회
  async getPaymentByImpUid(imp_uid: string) {
    const { Payments } = Request;
    const getByImpUid = Payments.getByImpUid({
      imp_uid: imp_uid,
    });

    let payment;
    try {
      payment = await getByImpUid.request(imp_init);
      payment = payment.data;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
    console.log({ payment });
    return payment;
  }
  // 아임포트 결제 취소
  async paymentCancel(imp_uid: string, cancelPrice: number, reason: string) {
    const { Payments } = Request;

    const cancel_data = {
      imp_uid: imp_uid, // 포트원(아임포트) 거래고유번호
      merchant_uid: '', // 주문번호(imp_uid 누락시 필수)
      amount: cancelPrice,
      tax_free: null, // 부가세 지정 (취소요청금액 중 면세금액)
      checksum: null, // 현재시점의 취소 가능한 잔액 (취소전 api요청자가 기록한 취소가능 금액과 포트원에서 기록한 취소가능금액이 일치하는지 검증 null인 경우 검증 생략)
      reason: reason, // 취소 사유
      refund_holder: null,  // 가상계좌 취소에 필요한 param
      refund_bank: null,  // 가상계좌 취소에 필요한 param
      refund_account: null, // 가상계좌 취소에 필요한 param
    };

    // 취소요청금액 중 면세 금액 계산
    if (commonUtils.getStatus('tax') > 0) {

    }

    const getByImpUid = Payments.cancel(cancel_data);

    let payment;
    try {
      payment = await getByImpUid.request(imp_init);
      payment = payment.data;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
    console.log({ payment });
    return payment;
  }

}
