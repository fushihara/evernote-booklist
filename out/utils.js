﻿"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateformat = require("dateformat");
const dns = require("dns");
async function requestから接続情報を取得(request) {
    const ヘッダー = (() => {
        const r = [];
        for (let i = 0; i < request.rawHeaders.length; i += 2) {
            r.push(`${request.rawHeaders[i]}:${request.rawHeaders[i + 1]}`);
        }
        return r.join("\n");
    })();
    const ipアドレス = (() => {
        const xRealIp = Object.entries(request.headers).filter(a => a["0"].toLowerCase() == "X-Real-IP".toLowerCase()).map(a => a["1"]).join("");
        if (xRealIp) {
            return xRealIp;
        }
        else {
            return request.ip;
        }
    })();
    const ua = Object.entries(request.headers).filter(a => a["0"].toLowerCase() == "User-Agent".toLowerCase()).map(a => a["1"]).join("");
    const ホスト = await ipアドレスからホストを逆引き(ipアドレス);
    return {
        ipアドレス,
        UA: ua,
        ホスト,
        ヘッダー
    };
}
exports.requestから接続情報を取得 = requestから接続情報を取得;
function ipアドレスからホストを逆引き(ipアドレス) {
    if (ipアドレス.trim() == "") {
        return Promise.resolve("");
    }
    return new Promise(resolve => {
        dns.reverse(ipアドレス, (_, domains) => {
            if (domains === undefined || domains.length == 0) {
                resolve("");
            }
            else {
                resolve(domains[0]);
            }
        });
    });
}
function mergeDateformat(マージ対象テキスト, 日付フォーマット = "yyyy/mm/dd(ddd)HH:MM:ss.l", 曜日の言語 = "en") {
    if (曜日の言語 == "en") {
        dateformat.i18n.dayNames = [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
    }
    else {
        dateformat.i18n.dayNames = [
            '日', '月', '火', '水', '木', '金', '土',
            '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'
        ];
    }
    const 接頭語 = dateformat(new Date(), 日付フォーマット);
    return マージ対象テキスト.split("\n").map(a => `${接頭語} ${a}`).join("\n");
}
exports.mergeDateformat = mergeDateformat;
;
function getIpv4Address() {
    const ifaces = require('os').networkInterfaces();
    const result = [];
    Object.keys(ifaces).forEach((interfaceName) => {
        const data = ifaces[interfaceName];
        data.forEach((interfaceOneData) => {
            const address = interfaceOneData.address;
            const family = interfaceOneData.family;
            if (family !== "IPv4") {
                return;
            }
            result.push(address);
        });
    });
    return result;
}
exports.getIpv4Address = getIpv4Address;
//# sourceMappingURL=utils.js.map