/*
 * @Author: LinQuan
 * @Date:   2018-06-28 14:44:20
 * @Last Modified by:   LinQuan
 * @Last Modified time: 2018-06-28 14:44:20
 */
const nodemailer = require('nodemailer');
module.exports = class Mailer {
  constructor(config = {}) {
    this.mailer = nodemailer.createTransport(config);
  }

  send(options) {
    return this.mailer.sendMail(options);
  }
};