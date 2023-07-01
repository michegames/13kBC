# phaser3-vite

template for phaser 3.6 and vita bundler

## install

Use nvm for install node LTS and then install

- nvm install --lts
- npm install

## config

setting vertical or orizontal in src/conf/config.js

- use 1024 as horizontal fixed base and dynamic vertical for horizontal games
- use 576 as horizontal fixed base and dynamic vertical for vertical games
- set "orientation": "portrait" | "landscape" in config.json

## usage

- *npm run dev* for local dev server
- *npm run build* for building the dist folder

## compile

Should be usable with https://html2app.dev

Just zip: zip -r app.zip assets www config.json (or tar -acvf app.zip www assets config.json)

## generate key

    mkdir keys
    cd keys
    keytool -genkey -v -keystore MY-RELEASE-KEY.keystore -alias MY_ALIAS_NAME -keyalg RSA -keysize 2048 -validity 10000 -storetype jks

