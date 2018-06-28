import helper from 'think-helper';
import Mailer from './lib/mailer';

module.exports = app => {
  function mailer(config) {
    const instance = new Mailer(config);
    return instance;
  }

  function injectMailer(config) {
    const mailerConfig = app.think.config('mailer', undefined);
    config = helper.parseAdapterConfig(mailerConfig, config);
    const instance = mailer(config);
    return instance;
  }

  return {
    think: {
      Mailer: Mailer,
      mailer: injectMailer
    },
    service: {
      mailer: injectMailer
    },
    controller: {
      mailer(config) {
        return this.ctx.mailer(config);
      }
    },
    context: {
      mailer(config) {
        config = helper.parseAdapterConfig(this.config('mailer'), config);
        const instance = mailer(config);
        return instance;
      }
    }
  };
};
