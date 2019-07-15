# Pull base image.
FROM debian

# Install Nginx and tor.
RUN \
  apt-get update && \
  apt-get install -y nodejs npm apt-utils tor && \
  rm -rf /var/lib/apt/lists/*
  

# Create tor config
RUN mkdir -p /usr/local/etc/tor/hidden_service/ && mkdir -p /etc/tor
RUN chmod 700 /usr/local/etc/tor/hidden_service/
RUN echo "HiddenServiceDir /usr/local/etc/tor/hidden_service/" >> /etc/tor/torrc
RUN echo "HiddenServicePort 80 127.0.0.1:9000" >> /etc/tor/torrc

# Application Path
RUN mkdir -p /usr/local/etc/app
ADD app /usr/local/etc/app

# Define working directory.
WORKDIR /usr/local/etc/app

RUN npm install

# Define default command.
CMD sh /usr/local/etc/app/start.sh && nodejs app.js

# Expose ports.
EXPOSE 80
EXPOSE 8080
