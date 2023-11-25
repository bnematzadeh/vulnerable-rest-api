# Vulnerable REST API - OWASP 2023

A vulnerable RESTful application written in Node and React based on [OWASP API security top 10 2023 edition](https://owasp.org/API-Security/editions/2023/en/0x11-t10/). Common API vulnerabilities and attack scenarios are also included to make it more comprehensive.

![Logo](https://raw.githubusercontent.com/bnematzadeh/vulnerable-rest-api/main/client/src/public/logo-home.png)

# How to install
## Option 1: Run on Docker (recommended)
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

## Option 2: Run on Your Machine (Manual Installation)
Make sure you have already installed Node and MongoDB on your system. 
- Client Setup
  - ```cd client/ ```
  - ```npm install```
  - ```npm start```
  - Access the application via http://localhost:3000
- Server Setup
  - Set your SMTP credentials as environment variables based on server/config/custom-environment-variables.json
  - Make sure the mongodb service is running 
    - ```cd server/ ```
    - ```npm install```
    - ```npm install migrate-mongo --dev-save && npm run db:up```
    - ```npm start```
    - The API is available on http://localhost:3001

# Vulnerabilities
- API1:2023 - Broken Object Level Authorization
- API2:2023 - Broken Authentication
- API3:2023 - Broken Object Property Level Authorization
- API4:2023 - Unrestricted Resource Consumption
- API5:2023 - Broken Function Level Authorization
- API6:2023 - Unrestricted Access to Sensitive Business Flows
- API7:2023 - Server Side Request Forgery
- API8:2023 - Security Misconfiguration
- API9:2023 - Improper Inventory Management
- API10:2023 - Unsafe Consumption of APIs
- Bonus
  - Injection
  - Web Cache Deception
  - Weak Implementation of Reset Password (Account Takeover)

