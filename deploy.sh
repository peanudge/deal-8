#! /bin/bash

cd ./frontend
npm run build
cp ./dist/* ../backend/public/
cd ../backend
npm run pm2
