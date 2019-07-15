# onion_nodejs_server
Onion Nodejs server

## Docker
### Compose
* docker-compose up

Or 

* docker-compose build
* docker-compose up

### BUILD
docker build . -t onion/server

### RUN
docker run onion/server

## Server Nodejs
This server use *express* framework

## Configurations
### Database
* Open file in Onion/app/configurations/pass.js
* Change **Bcrypt Hash** and **Bcrypt Salt**
* Change **Session Secret**
* Change **Mysql** credentials

### Files
* Open file in Onion/app/configurations/constants.js
* Change upload path folder

### HTTPS
* Put **Private** and **Public** key on folder Onion/app/sslcert
* Open file in Onion/app/configurations/constants.js
* Change respective filenames

### PORTS
* Open file in Onion/app/configurations/constants.js
* Change **HTTP** and **HTTPS** ports

## Maintener
* João Carlos Pandolfi Santana
* joaopandolfi@gmail.com