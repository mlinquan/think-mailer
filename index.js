var _thinkHelper = require('think-helper');

var _thinkHelper2 = _interopRequireDefault(_thinkHelper);

var _mailer = require('./lib/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = app => {
  function mailer(config) {
    const instance = new _mailer2.default(config);
    return instance;
  }

  function injectMailer(config) {
    const mailerConfig = app.think.config('mailer', undefined);
    config = _thinkHelper2.default.parseAdapterConfig(mailerConfig, config);
    const instance = mailer(config);
    return instance;
  }

  return {
    think: {
      Mailer: _mailer2.default,
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
        config = _thinkHelper2.default.parseAdapterConfig(this.config('mailer'), config);
        const instance = mailer(config);
        return instance;
      }
    }
  };
};