FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN mkdir -p /log/app

EXPOSE 3000

CMD ["sh", "-c", "npm start > /log/app/output.log 2>&1"]
