
# Cyrtp csv parser

This a project that will parse a CSV file and get the desired portfolio data as the parameter it's given.






## Run Locally

Clone the project

```bash
  git clone https://github.com/HazeBigya/Crypto-CSV-portfolio.git
```

Go to the project directory

```bash
  cd Crypto-CSV-portfolio
```

Install dependencies

```bash
  npm install
```

Add your csv file to the porject folder and change the name of the csv transactions.csv or change the file name in the app.js file.

```bash
  const fileName = 'transactions.csv'
```
## Node Commands

#### Get the latest portfolio value per token in USD

```http
  node app.js
```
#### Example Result

| Index | token     | total      | rate      | amount      |
| :-------- | :------- | :------- | :------- | :------- |
| 0 | **'BTC'** | 0.29866 | 16937.17 | 5058.4551922 |
| 1 | **'ETH'** | 0.27123 | 1262.28 | 342.3682044 |
| 2 | **'XRP'** | 1.490353 | 0.3402 | 0.5070180906 |

#### Get the latest portfolio value for that token in USD

```http
  node app.js --token 'BTC'
```

| Index | token     | total      | rate      | amount      |
| :-------- | :------- | :------- | :------- | :------- |
| 0 | **'BTC'** | 0.29866 | 16937.17 | 5058.4551922 |

#### Get the portfolio value per token in USD on that date

```http
  node app.js --date '2022-01-08'
```

| Index | token     | total      | rate      | amount      |
| :-------- | :------- | :------- | :------- | :------- |
| 0 | **'BTC'** | 0.29866 | 16937.17 | 5058.4551922 |
| 1 | **'ETH'** | 0.27123 | 1262.28 | 342.3682044 |
| 2 | **'XRP'** | 1.490353 | 0.3402 | 0.5070180906 |

#### Get the portfolio value of that token in USD on that date

```http
  node app.js --token 'ETH' --date '2022-01-08'
```

| Index | token     | total      | rate      | amount      |
| :-------- | :------- | :------- | :------- | :------- |
| 0 | **'ETH'** | 0.27123 | 1262.28 | 342.3682044 |





## Documentation

For the design process that went into the project, I decided to use Js es6 import/exports and OOP-based code structure.

I decided to divide the many functionalities into smaller modules and create classes of those modules and separate the classes based on their general use cases.
All of the classes are store in the ```src``` directory.

The initial file *app.js* creates a new instance of the class ``` File ```. The ```parseSCV()``` method parses the csv file using the ```csvParser``` package.
When the ```File``` instace is created it also creates an instande of ```Checks``` class. From the checks class we get the what params that were passed and the values for it. To parse the parameter given in the terminal I used the ```minimist``` npm package that makes handling the parameters easier. 

The ```Utitly``` class has the methods where most of the logic resides. Based on what params were passed the corresponing method form the ```Utility``` class is called.

Finally after the csv file is parsed, to get the current rate of the token and the final amount of the token. ```API``` class has the method to fetch the current rate of the said in USD. The api used here is from [cryptocompare](https://min-api.cryptocompare.com/).



