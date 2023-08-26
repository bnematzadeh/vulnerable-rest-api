# Vulnerable REST API - OWASP 2023

A vulnerable RESTful application written in Node and React based on [OWASP API security top 10 2023 edition](https://owasp.org/API-Security/editions/2023/en/0x11-t10/). Common API vulnerabilities and attack scenarios are also included to make it more comprehensive.

![Logo](https://raw.githubusercontent.com/bnematzadeh/vulnerable-rest-api/main/client/src/public/logo.png)

# How to install

```
git clone https://github.com/bnematzadeh/vulnerable-rest-api.git
```

```
cd vulnerable-rest-api/
```

Add your SMTP credentials and provider in server/smtp_config.list. I personally recommend the [elasticemail](https://elasticemail.com/):

- Create an account
- Navigate to settings/Create SMTP Credentials
- Edit "server/smtp_config.list" and add your credentials

```
docker-compose up --build
```

Access the Application

- Client: localhost:3000
- API: localhost:3001
