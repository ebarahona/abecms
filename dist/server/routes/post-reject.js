'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _htmlMinifier = require('html-minifier');

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _cli = require('../../cli');

var abe = _interopRequireWildcard(_cli);

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _package = require('../../../package');

var _package2 = _interopRequireDefault(_package);

var _editor = require('../controllers/editor');

var _abeLocale = require('../helpers/abe-locale');

var _abeLocale2 = _interopRequireDefault(_abeLocale);

var _page = require('../helpers/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = function route(req, res, next) {
  _cli.Hooks.instance.trigger('beforeRoute', req, res, next);
  if (typeof res._header !== 'undefined' && res._header !== null) return;

  var p = new Promise(function (resolve, reject) {
    (0, _cli.save)(_cli.fileUtils.getFilePath(req.body.filePath), req.body.tplPath, req.body.json, '', 'draft', null, 'reject').then(function () {
      resolve();
    }).catch(function (e) {
      console.error(e.stack);
    });
  });

  p.then(function (resSave) {
    (0, _cli.save)(_cli.fileUtils.getFilePath(req.body.filePath), req.body.tplPath, req.body.json, '', 'reject', resSave, 'reject').then(function (resSave) {
      if (typeof resSave.error !== 'undefined' && resSave.error !== null) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ error: resSave.error }));
      }
      var result;
      if (typeof resSave.reject !== 'undefined' && resSave.reject !== null) {
        result = resSave;
      }
      if (typeof resSave.json !== 'undefined' && resSave.json !== null) {
        result = {
          success: 1,
          json: resSave.json
        };
      }
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
    });
  }).catch(function (e) {
    console.error(e.stack);
  });
};

exports.default = route;