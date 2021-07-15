#! /bin/bash

cd ./frontend
webpack
cp ./dists/* ../backend/public/
cd ../backend
npm pm2
