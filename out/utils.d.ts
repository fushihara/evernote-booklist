import * as express from "express";
export declare function requestから接続情報を取得(request: express.Request): Promise<{
    ipアドレス: string;
    ホスト: string;
    UA: string;
    ヘッダー: string;
}>;
export declare function mergeDateformat(マージ対象テキスト: string, 日付フォーマット?: string, 曜日の言語?: "ja" | "en"): string;
export declare function getIpv4Address(): string[];
