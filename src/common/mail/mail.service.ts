import { ConfigService } from '@/config';
import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  /**
   * NodeMailer实例
   */
  protected instance: nodemailer.Transporter;

  /**
   * 构造函数
   */
  constructor(private config: ConfigService) {
    const { host, port, user, pass } = this.config.smtp;
    this.instance = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
    });
  }

  /**
   * 发送邮件
   * @param to 目标邮箱
   * @param subject 主题
   * @param html 内容
   */
  sendMail(to: string, subject: string, html: string) {
    return this.instance.sendMail({
      from: `${this.config.title} <${this.config.smtp.user}>`,
      to,
      subject,
      html,
    });
  }
}
