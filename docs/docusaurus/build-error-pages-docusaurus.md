---
custom_edit_url: null
id: build-error-pages-docusaurus
tags: [Docusaurus, Cloudflare Pages]
---

# Cloudflare PagesでDocusaurusのビルドがコケるときの対処法

## TL;DR

- Cloudflare Pages上で、Docusaurusで作ったWebサイトをbuildしようとすると、エラーが出て失敗する。
- Cloudflare Pagesのビルドで用いるNode.jsのバージョンが `v12.18.0` と古いことが原因。
- 環境変数 `NODE_VERSION` でビルド時のNode.jsのバージョンを指定できる。
- Docusaurusの要求バージョンである `v16.14` 以上に設定することでビルドに成功する。

## はじめに

このサイトは、Docusaurusで作ったWebサイトを、Cloudflare Pagesでホストして公開しています。しかし、Cloudflare Pagesでビルドしようとすると、構文エラーが発生し失敗します。

## 現象

Cloudflare Pagesでgitリポジトリを接続し、ビルドの設定後、初回ビルドを実施すると、次のようなエラーログを出して失敗します。

```
00:45:18.232	> 920-oj-net@0.0.0 build /opt/buildhome/repo
00:45:18.232	> docusaurus build
00:45:18.232	
00:45:18.311	(node:1367) ExperimentalWarning: The ESM module loader is experimental.
00:45:18.318	file:///opt/buildhome/repo/node_modules/@docusaurus/core/bin/docusaurus.mjs:27
00:45:18.318	await beforeCli();
00:45:18.319	^^^^^
00:45:18.319	
00:45:18.319	SyntaxError: Unexpected reserved word
00:45:18.319	    at Loader.moduleStrategy (internal/modules/esm/translators.js:81:18)
00:45:18.319	    at async link (internal/modules/esm/module_job.js:37:21)
00:45:18.323	npm ERR! code ELIFECYCLE
00:45:18.324	npm ERR! errno 1
00:45:18.324	npm ERR! 920-oj-net@0.0.0 build: `docusaurus build`
00:45:18.325	npm ERR! Exit status 1
00:45:18.325	npm ERR! 
00:45:18.325	npm ERR! Failed at the 920-oj-net@0.0.0 build script.
00:45:18.325	npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
00:45:18.333	
00:45:18.333	npm ERR! A complete log of this run can be found in:
00:45:18.333	npm ERR!     /opt/buildhome/.npm/_logs/2023-03-18T15_45_18_325Z-debug.log
00:45:18.341	Failed: build command exited with code: 1
00:45:19.199	Failed: an internal error occurred
```

さらにログを遡ると、ビルド環境の初期化時に各ツールのバージョン情報が表示されます。その中でNode.jsは `v12.18.0` がインストールされたことがわかります。

```
00:44:40.871	v12.18.0 is already installed.
00:44:42.122	Now using node v12.18.0 (npm v6.14.4)
```

## 原因

Cloudflare Pagesで使用されるNode.jsのバージョンが古いことが原因です。

Docusaurusの公式ドキュメントに、必須Node.jsバージョンは `v16.14` 以上であると記載されています。

> Requirements  
> Node.js version 16.14 or above (which can be checked by running node -v). You can use nvm for managing multiple Node versions on a single machine installed.

https://docusaurus.io/docs/installation#requirements

一方、Cloudflare Pagesで使用されるビルドツールのバージョンは以下のページに記載されており、Node.jsは `v12.18.0` であるようです。

> Language support and tools  
> Language: Node.js  
> Default version: 12.18.0  
> supported versions: Any version up to 17.x  
> Environment variable `NODE_VERSION`  
> File: `.nvmrc`. `.node-version`  

https://developers.cloudflare.com/pages/platform/build-configuration/#language-support-and-tools

また、Cloudflare Pagesで利用できるNode.jsのバージョンは、17.xまでの全バージョンとのことです。2023年3月現在でLTSが18.15.0、最新版が19.8.1なので、最新のものには対応しきれていないようです。

## 解決策

Cloudflare Pagesで利用するNode.jsのバージョンを、LTSである16系の最新版である `16.19.1` に固定します。（ここでは2023年3月現在の16系の最新版にしましたが、適宜最新版のバージョンを確認し設定してください。Node.jsの最新バージョンは[リリースページ](https://nodejs.org/ja/download/releases)で確認できます。）

方法はいくつかありますが、ここでは環境変数でバージョンを指定する方法で設定します。

Cloudflare PagesのProjectの `Settings` から、 `Environment variables` に進みます。Production（本番環境）とPreview（プレビュー環境）の2環境において環境変数を設定するボタンがあるので、両方ともに以下のように設定します。

- Variable name: `NODE_VERSION`
- Value: `16.19.1`

![環境変数を設定](/img/docs/build-error-pages-docusaurus/40873e086133331eb838c6463e88dd663e43b45b0c9c20fe2f7c4c5ed8d22e77.png)  

設定したら、`Save` で保存し、 `All deployments` → 失敗したビルドの `Retry deproyment` をクリックすることで再度ビルドされます。

![Retry deproyment](/img/docs/build-error-pages-docusaurus/99ddd33daba1ca55794b4b6cd7e080cb59b86926904b7580735f1b90ad0af46b.png)  

ログを確認すると、`Now using node v16.19.1 (npm v8.19.3)` と表示されており、正常にビルドが完了しました。

```
02:43:14.690	Now using node v16.19.1 (npm v8.19.3)
(中略)
02:43:43.800	> 920-oj-net@0.0.0 build
02:43:43.801	> docusaurus build
02:43:43.801	
02:43:46.542	[INFO] [ja] Creating an optimized production build...
02:43:47.971	ℹ Compiling Client
02:43:48.001	ℹ Compiling Server
02:44:05.755	✔ Client: Compiled successfully in 17.79s
02:44:07.752	✔ Server: Compiled successfully in 19.75s
02:44:18.689	[SUCCESS] Generated static files in "build".
(中略)
02:44:22.515	✨ Success! Uploaded 51 files (1.66 sec)
02:44:22.515	
02:44:23.080	✨ Upload complete!
02:44:24.986	Success: Assets published!
02:44:25.800	Success: Your site was deployed!
```

## まとめ

Cloudflare Pagesのビルド設定中、使用するフレームワークとしてDocusaurusを選択した場合、ビルド先のディレクトリなどの設定は自動で入力されますが、Node.jsのバージョンは自動で設定されないようです。今では `v12` 系をサポートしないフレームワークも増えているので、Docusaurusに限らずビルドに失敗する場合は、ツールのバージョンを疑ってみるのも良さそうです。
