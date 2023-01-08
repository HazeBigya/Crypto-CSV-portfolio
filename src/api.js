import axios from "axios"
import * as dotenv from 'dotenv'

dotenv.config()

class API {
    constructor(key, url) {
        this.key = key
        this.url = url
    }

    getTokenCurrUsdPrice = async (val) => {
        try {
            return await axios.get(`${this.url}?fsym=${val.token}&tsyms=USD`, {
                headers:
                    { 'authorization': this.key },
            }).then((response) => {
                return response.data.USD;
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const api = new API(process.env.CRYPTO_COMPARE_API_KEY, process.env.CRYPTO_COMPARE_API_URL)