import fs from "fs"
import csvParser from "csv-parser"
import { utility } from "./utility.js";
import { checks } from "./checks.js"
import { api } from "./api.js"

export default class File {
    constructor(file) {
        this.file = file;
        this.param = checks.checkParam()
        this.token = checks.getToken().toUpperCase()
        this.date = new Date(checks.getDate())
    }

    parseCSV() {
        fs.createReadStream(this.file)
            .pipe(csvParser())
            .on('data', (row) => {
                switch (this.param) {
                    case "NONE":
                        utility.noneParamPortfolio(row)
                        break;
                    case "TOKEN":
                        utility.tokenParamPortfolio(row, this.token)
                        break;
                    case "DATE":
                        utility.dateParamPortfolio(row, this.date)
                        break;
                    case "TOKEN_AND_DATE":
                        utility.tokenAndDateParamPortfolio(row, this.token, this.date)
                        break;
                    default:
                        break;
                }
            })
            .on('end', async () => {
                await Promise.all(
                    utility.portfolio.map(async item => {
                        const rate = await api.getTokenCurrUsdPrice(item)
                        const amount = utility.roundNumber((+rate) * (+item.total), 12)
                        item.rate = rate
                        item.amount = amount
                    })
                );
                console.table(utility.portfolio);
            });
    }
}