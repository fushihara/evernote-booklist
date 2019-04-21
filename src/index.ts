import * as express from "express";
import { mergeDateformat, getIpv4Address, requestから接続情報を取得 } from "./utils";
// configで読み込むファイル名はこちら。値のマージも可能。 https://github.com/lorenwest/node-config/wiki/Configuration-Files
import { get as configGet } from "config";
import { EvernoteClient } from "./evernote";
const log = (message: string) => console.log(mergeDateformat(message));

const app = express();
const config = {
  express: {
    urlPort: configGet<number>("express.urlPort"),
    urlPrefix: configGet<string>("express.urlPrefix"),
    token: configGet<string>("express.token"),
    ACAO: configGet<string>("express.ACAO"),
  },
  evernoteDeveloperToken: configGet<string>("evernoteDeveloperToken")
};

process.on('unhandledRejection', (reason, _promise) => {
  console.error(reason);
});
class Main {
  async init() {
    app.use((request: express.Request, _response: express.Response, next) => {
      requestから接続情報を取得(request).then(a => {
        log(JSON.stringify(a, null, "  "));
      });
      next();
    })
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
    app.get(config.express.urlPrefix, async (request: express.Request, response: express.Response) => {
      const token = String(request.query.token) || ""
      response.setHeader("Access-Control-Allow-Origin", config.express.ACAO);
      if (token !== config.express.token) {
        response.status(403).end();
        return;
      }
      EvernoteClient.getEvernoteAllNoteData(config.evernoteDeveloperToken).then(noteBookList => {
        response.status(200).contentType("application/json").json(noteBookList).end();
      }).catch((err: any) => {
        log(err);
        response.status(500).end();
        return;
      });
    });
    app.listen(config.express.urlPort, () => {
      log("ready")
      log(` http://localhost:${config.express.urlPort}${config.express.urlPrefix}`);
      getIpv4Address().forEach(address => {
        log(` http://${address}:${config.express.urlPort}${config.express.urlPrefix}`);
      });
    });
  }
}
new Main().init();
