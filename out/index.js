﻿"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utils_1 = require("./utils");
// configで読み込むファイル名はこちら。値のマージも可能。 https://github.com/lorenwest/node-config/wiki/Configuration-Files
const config_1 = require("config");
const evernote_1 = require("./evernote");
const Evernote = require('evernote');
const log = (message) => console.log(utils_1.mergeDateformat(message));
const app = express();
const config = {
    express: {
        urlPort: config_1.get("express.urlPort"),
        urlPrefix: config_1.get("express.urlPrefix"),
        token: config_1.get("express.token"),
    },
    evernoteDeveloperToken: config_1.get("evernoteDeveloperToken")
};
process.on('unhandledRejection', (reason, _promise) => {
    console.error(reason);
});
class Main {
    async init() {
        app.use((request, _response, next) => {
            utils_1.requestから接続情報を取得(request).then(a => {
                log(JSON.stringify(a, null, "  "));
            });
            next();
        });
        /**
      * リクエストデータを取得する方法
      *   app.get の中で:keywordId の様に指定したキーワードの値
      *     request.params.keywordId
      *   getパラメーターの中で指定された値
      *     request.query.keywordId
      *   postパラメーターの中で指定された値
      *     request.body.column
      *   POSTでパラメータを受信する方法。ヘッダーが大事
      *     await fetch("http://127.0.0.1:51919/test/yyyy",{method:"post",body:"hoge=aaaaaaaaaaaaaa",headers:{"Content-Type":"application/x-www-form-urlencoded"}})
      */
        app.get(config.express.urlPrefix, async (request, response) => {
            const token = String(request.query.token) || "";
            if (token !== config.express.token) {
                response.status(403).end();
                return;
            }
            evernote_1.EvernoteClient.getEvernoteAllNoteData(config.evernoteDeveloperToken).then(noteBookList => {
                response.status(200).contentType("application/json").json(noteBookList).end();
            }).catch((err) => {
                console.log(err);
            });
        });
        app.listen(config.express.urlPort, () => {
            console.log("ready");
            log(` http://localhost:${config.express.urlPort}${config.express.urlPrefix}`);
            utils_1.getIpv4Address().forEach(address => {
                log(` http://${address}:${config.express.urlPort}${config.express.urlPrefix}`);
            });
        });
    }
}
new Main().init();
//# sourceMappingURL=index.js.map