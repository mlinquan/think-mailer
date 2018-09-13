# think-mailer
[![npm](https://img.shields.io/npm/v/think-mailer.svg?style=flat-square)](https://www.npmjs.com/package/think-mailer)
[![Build Status](https://travis-ci.org/thinkjs/think-mailer.svg?branch=master)](https://travis-ci.org/thinkjs/think-mailer)
[![Coverage Status](https://coveralls.io/repos/github/mlinquan/think-mailer/badge.svg?branch=master)](https://coveralls.io/github/mlinquan/think-mailer?branch=master)
![NPM version](https://badge.fury.io/js/think-mailer.svg)
![Downloads](http://img.shields.io/npm/dm/think-mailer.svg?style=flat)

Thinkjs mailer adapter

Development based on [nodemailer](https://www.npmjs.com/package/nodemailer)

## Install
```bash
yarn add think-mailer --save
#npm install think-mailer --save
#cnpm install think-mailer --save
```


## Config
### ThinkJSProjectRoot/src/config/adapter.js
```js
exports.mailer = {
  type: 'mailer',
  mailer: {
    host: 'smtp.xxx.com',
    port: 465,
    secure: true,
    auth: {
      user: 'xxx@xxx.com', // your account
      pass: 'JfoBrEMBYkzhvzRB' // authorization code, not the email password
    },
    tls: {
      rejectUnauthorized: false
    }
  }
};
```


### ThinkJSProjectRoot/src/config/extend.js
```js
const view = require('think-view');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');
const email = require('think-mailer');

module.exports = [view, mongo(think.app), cache, session, email(think.app)];
```


## Send Mail
### ThinkJSProjectRoot/src/controller/xxx.js
```js
const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    const mailer = ctx.mailer()
    return mailer.send({
      from: 'xxx@xxx.com',
      to: 'xxx@xxx.com',
      subject: 'Email Tile',
      html: '<p>Email content</p>'
    })
    .then(async function(res) {
      return ctx.success({
        msg: 'Email Sent.'
      })
    })
    .catch(function(err) {
      console.log(err)
      return ctx.fail(1000, 'Email send failed.')
    });
  }
};
```
