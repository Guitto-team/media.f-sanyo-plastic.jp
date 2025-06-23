[![Netlify Status](https://api.netlify.com/api/v1/badges/41b7b770-7fa5-4069-9fcd-88ecd590a7e7/deploy-status)](https://app.netlify.com/projects/f-sanyo-plastic/deploys)


## はじめに

Node.jsの推奨バージョンは v20.15.0 です。

バージョンが異なる場合は、下記を参考にバージョンを切り替える。

https://guitto.notepm.jp/page/f67c03ad58

APIキーは下記に保存しています。（.env.development.local, .env.local）

作業開始前にダウンロードしアプリケーションのルートディレクトリに設置して下さい。

https://drive.google.com/drive/folders/1WiwzetwqQ_S8q9NKR_xbW_qiR0_JFMEg?usp=drive_link

その後下記コマンドを実行。

下記は初回のみ（パッケージインストール後は不要）

```bash
yarn
```
パッケージインストール後下記、アプリケーション起動

```bash
yarn dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開くと、結果を見ることができます。

ページの編集は `pages/*.tsx` を修正することで開始できます。ファイルを編集すると、ページが自動更新されます。

[APIルート](https://nextjs.org/docs/api-routes/introduction)は、[http://localhost:3000/api/hello](http://localhost:3000/api/hello)でアクセスすることができます。このエンドポイントは `pages/api/hello.js` で編集することができる。

pages/api` ディレクトリは `/api/*` にマップされる。このディレクトリにあるファイルは React ページではなく、[API routes](https://nextjs.org/docs/api-routes/introduction) として扱われる。

