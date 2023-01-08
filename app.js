import File from "./src/file.js"

const fileName = 'transactions.csv';
const file = new File(fileName)

const getResult = () => file.parseCSV()
getResult()



