
# Hudu API Client

A client to quickly and easily make calls to the Hudu documentation tool's API. It uses Axios to make the HTTP requests.

This project is to make handling these API calls a bit easier for another project I'm working on, so at the current moment, I have no intentions of fully fleshing this out, but publishing in case someone finds it helpful.


## Usage
```js
const Hudu = require("hudu-api-client")

async function main(){
    //Domain may look something like company.huducloud.com
    const client = new Hudu.APIClient("yourdomain", "yourapikey")

    //Get all companies
    const companies = await client.getCompanies()

    //Get passwords for company with ID 5
    const passwords = await client.getPasswords(5)
}
```