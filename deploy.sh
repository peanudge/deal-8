#! /bin/bash

cd ./frontend
webpack
cp ./dist/* ../backend/public/
cd ../backend
npm run pm2
