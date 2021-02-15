#!/bin/bash

cd backend/
# 01) Spin up Virtualenv
. venv/bin/activate
cd app/

# 02) Spin Up server
nohup gunicorn app.main:app -b 127.0.0.1:8081 -k uvicorn.workers.UvicornWorker &
sleep 5;
nohup gunicorn app.main:app -b 127.0.0.1:8080 -k uvicorn.workers.UvicornWorker &
sleep 5;