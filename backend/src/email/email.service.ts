import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const url = `${process.env.BACKEND_URL}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: 'Asset Portfolio 가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다. <br/>
        <a href="${url}" target="_self">${url}</a>
      `,
    };

    console.log('[EmailService] Mail Sending ...');
    return await this.transporter.sendMail(mailOptions);
  }
}
