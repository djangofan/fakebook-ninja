
FROM node:14

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g @angular/cli@11.0

COPY package.json /usr/src/app/package.json
RUN npm install

CMD ["ng","serve","--host", "0.0.0.0", "--disable-host-check", "--poll"]

# NOTE: live code reload requires:
#   - on Mac: open code listening port 'expose 49153'
#   - on Windows: pass the '--poll' arg to the above command (optionally pass additional interval arg)

# NOTE: run this project with:
#   -  docker-compose build
#   -  docker-compose up -d
#   -  then wait a minute or two for the logs to appear in the docker container and the app to be started.  it is slow.
