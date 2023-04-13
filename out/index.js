"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
const axios_1 = __importDefault(require("axios"));
class APIClient {
    constructor(domain, apiKey) {
        if (!domain)
            throw new Error("Domain is required");
        if (!apiKey)
            throw new Error("API key is required");
        this.domain = domain;
        this.apiKey = apiKey;
    }
    getCompanies(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const companies = [];
            console.log(`Getting companies on page ${page}`);
            const response = yield (0, axios_1.default)({
                method: "GET",
                url: `https://${this.domain}/api/v1/companies?page_size=1000&page=${page}`,
                headers: {
                    "X-API-KEY": this.apiKey
                }
            });
            companies.push(...response.data.companies);
            if (response.data.companies.length === 1000) {
                const nextPage = yield this.getCompanies(page + 1);
                companies.push(...nextPage);
            }
            companies.sort((a, b) => a.name.localeCompare(b.name));
            return companies;
        });
    }
    getPasswords(companyId, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwords = [];
            console.log(`Getting passwords for company with ID ${companyId}`);
            const response = yield (0, axios_1.default)({
                method: "GET",
                url: `https://${this.domain}/api/v1/asset_passwords?page=${page}`,
                headers: {
                    "X-API-KEY": this.apiKey
                },
                data: {
                    company_id: companyId
                }
            });
            passwords.push(...response.data.asset_passwords);
            if (response.data.passwords.length === 1000) {
                const nextPage = yield this.getPasswords(page + 1);
                passwords.push(...nextPage);
            }
            passwords.sort((a, b) => a.name.localeCompare(b.name));
            return passwords;
        });
    }
}
exports.APIClient = APIClient;
exports.default = APIClient;
