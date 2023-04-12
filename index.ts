
import Axios from "axios"

class APIClient {
    apiKey: string
    domain: string
    constructor(domain: string, apiKey: string) {
        if(!domain) throw new Error("Domain is required")
        if(!apiKey) throw new Error("API key is required")

        this.domain = domain
        this.apiKey = apiKey
    }

    async getCompanies(page: number = 1): Promise<any | undefined>  {
        const companies = []
        console.log(`Getting companies on page ${page}`)
        const response = await Axios({
            method: "GET",
            url: `https://${this.domain}/api/v1/companies?page_size=1000&page=${page}`, 
            headers: {
                "X-API-KEY": this.apiKey
            }
        })

        companies.push(...response.data.companies)

        if(response.data.companies.length === 1000){
            const nextPage = await this.getCompanies(page + 1)
            companies.push(...nextPage)
        }

        companies.sort((a, b) => a.name.localeCompare(b.name))
        
        return companies
    }

    async getPasswords(companyId: number, page: number = 1): Promise<any | undefined>  {
        const passwords = []
        console.log(`Getting passwords for company with ID ${companyId}`)
        const response = await Axios({
            method: "GET",
            url: `https://${this.domain}/api/v1/asset_passwords?page=${page}`, 
            headers: {
                "X-API-KEY": this.apiKey
            },
            data: {
                company_id: companyId
            }
        })

        passwords.push(...response.data.asset_passwords)

        if(response.data.passwords.length === 1000){
            const nextPage = await this.getPasswords(page + 1)
            passwords.push(...nextPage)
        }

        passwords.sort((a, b) => a.name.localeCompare(b.name))
        
        return passwords
    }
}

export default APIClient