
# Gmailのhtmlメールをmarkdown記法に変換して、クリップボードにコピーする、GASのWebアプリ


## usage

```bash
# gmail_to_markdownをclone
git clone git@github.com:anyumuenyumuboto/gmail_to_markdown.git
# claspのインストール
npm install @google/clasp -g
# Googleアカウントにログイン
clasp login
# プロジェクトの作成
clasp create --title "任意のプロジェクト名" --type standalone
# claspのルートディレクトリを変更
cp -ip .clasp.json .clasp.json.bak
cat .clasp.json.bak | jq '.rootDir|="./publish"' > .clasp.json
# npmパッケージのインストール
npm install
# Webアプリのbuild及びコードをプッシュする
task push
# deploy
clasp deploy
# webアプリのURLを開く(先程のdeployで表示されたIDを選択)
clasp open-web-app
```


## 参考にさせていただいたサイトなど

[gas with clasp でシンプルなウェブアプリをデプロイする](https://zenn.dev/haruyuki_16278/scraps/de8f0c1096ee83)




