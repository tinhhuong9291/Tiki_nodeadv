import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  sendMailConfirm(data) {
    let configMail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tiennestjs@gmail.com',
        pass: 'thanhtien2112003',
      },
    });

    let infoMail = {
      from: 'tiennestjs@gmail.com',
      to: data, // "nguyenthanhtien2112003@gmail.com"
      subject: 'Đặt hàng qua Amazon',
      html: '<h1> Xác nhận đơn hàng thành công </h1>',
    };

    configMail.sendMail(infoMail, (error) => error);
  }

  sendMailSuccess(data) {
    let configMail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tiennestjs@gmail.com',
        pass: 'thanhtien2112003',
      },
    });

    // gửi mail thành công
    let infoMail = {
      from: 'tiennestjs@gmail.com',
      to: data, // "nguyenthanhtien2112003@gmail.com"
      subject: 'Đặt hàng qua Amazon',
      html: "<h1 style='color:red' > Đặt hàng thành công </h1>",
    };

    configMail.sendMail(infoMail, (error) => error);
  }
}
