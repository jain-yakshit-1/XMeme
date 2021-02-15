#!/bin/bash

#---------------------------------------------------------------------------------------------------------------------------------
# install.sh

# 01) Run the following commands as root or user with sudo access to update the packages list and install the prerequisites:
apt update -y
apt install software-properties-common -y

# 02) Add the deadsnakes PPA to your system’s sources list:
add-apt-repository ppa:deadsnakes/ppa -y

# 03) Once the repository is enabled, install Python 3.8 with:
apt install python3.8 -y

# 04) Install virtualenv 
apt install virtualenv -y

# 05)Installing PostgreSQL
apt install postgresql postgresql-contrib -y

# 06) Configure Postgres
sudo -u postgres createuser xmemeadmin
sudo -u postgres createdb xmeme
sudo -u postgres psql -c "alter user xmemeadmin with encrypted password 'docker';"
sudo -u postgres psql -c "grant all privileges on database xmeme to xmemeadmin;"

# 07) Spin up Virtualenv
cd backend/
/usr/bin/virtualenv -p python3.8 venv
. venv/bin/activate

#08) Install backend project dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install -e .

#09) Migrate Database
cd app/
sleep 5;
alembic upgrade head

#10) Deactivate virtual environment
deactivate