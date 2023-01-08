class Utility {
    constructor() {
        this.portfolio = []
        this.roundDigit = 12
    }

    roundNumber(number, decimals) {
        var newnumber = new Number(number + '').toFixed(parseInt(decimals))
        return parseFloat(newnumber)
    }

    calculateAmount(amt, transaction_type, tnx_amt) {
        switch (transaction_type) {
            case "DEPOSIT":
                return this.roundNumber((+amt) + (+tnx_amt), this.roundDigit)
            case "WITHDRAWAL":
                return this.roundNumber((+amt) - (+tnx_amt), this.roundDigit)
            default:
                return false
        }
    }

    noneParamPortfolio(data) {
        if (this.portfolio.some(o => o.token == data.token)) {
            const obj = this.portfolio.find(o => o.token == data.token);
            let amt = obj.total
            const total = this.calculateAmount(amt, data.transaction_type, data.amount)
            obj.total = total
        } else {
            this.initialTransaction(data.token, data.transaction_type, data.amount)
        }
    }

    tokenParamPortfolio(data, token) {
        if (data.token === token) {
            if (this.portfolio.length !== 0) {
                let amt = this.portfolio[0].total
                const total = this.calculateAmount(amt, data.transaction_type, data.amount)
                this.portfolio[0].total = total
            } else {
                this.initialTransaction(data.token, data.transaction_type, data.amount)
            }
        }
    }

    dateParamPortfolio(data, date) {
        const date2 = new Date(data.timestamp * 1000);
        if (date2.getFullYear() === date.getFullYear() && date2.getMonth() === date.getMonth() && date2.getDate() === date.getDate()) {
            if (this.portfolio.some(o => o.token == data.token)) {
                const obj = this.portfolio.find(o => o.token == data.token);
                let amt = obj.total
                const total = this.calculateAmount(amt, data.transaction_type, data.amount)
                obj.total = total
            } else {
                this.initialTransaction(data.token, data.transaction_type, data.amount)
            }
        }
    }

    tokenAndDateParamPortfolio(data, token, date) {
        const date2 = new Date(data.timestamp * 1000);
        if (date2.getFullYear() === date.getFullYear() && date2.getMonth() === date.getMonth() && date2.getDate() === date.getDate()) {
            if (data.token === token) {
                if (this.portfolio.length !== 0) {
                    let amt = this.portfolio[0].total
                    const total = this.calculateAmount(amt, data.transaction_type, data.amount)
                    this.portfolio[0].total = total
                } else {
                    this.initialTransaction(data.token, data.transaction_type, data.amount)
                }
            }
        }
    }

    initialTransaction(token, transaction_type, amount) {
        let total_amt = 0;
        const total = this.calculateAmount(total_amt, transaction_type, amount)
        this.portfolio.push({
            token,
            total,
            rate: null,
            amount: null
        });
    }
}

export const utility = new Utility()