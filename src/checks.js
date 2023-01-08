import minimist from "minimist";

const type = {
    TOKEN_AND_DATE: "TOKEN_AND_DATE",
    TOKEN: "TOKEN",
    DATE: "DATE",
    NONE: "NONE"
}

class Checks {
    constructor(argv) {
        this.argv = minimist(argv)
        this.params = []
        this.paramCheck = ["token", "date"]
        this.populateParams()
    }

    populateParams() {
        Object.keys(this.argv).map(key => this.params.push(key.toLowerCase()))
    }

    checkParam() {
        if (this.paramCheck.every(value => this.params.includes(value))) {
            return type.TOKEN_AND_DATE
        } else if (this.params.includes("token")) {
            return type.TOKEN
        } else if (this.params.includes("date")) {
            return type.DATE
        } else {
            return type.NONE
        }
    }

    getToken() {
        return this.params.includes("token") ? this.argv.token : ""
    }

    getDate() {
        return this.params.includes("date") ? this.argv.date : ""
    }
}

export const checks = new Checks(process.argv.slice(2))
