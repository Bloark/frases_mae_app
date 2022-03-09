//npm install pg
//Importa somente a classe cliente da biblioteca pg com método desetruturação.
const { Client } = require('pg')

const client = new Client({
    connectionString: 'postgres://ljukfvbtcdezhr:0f13f95eec81b12b482aa9ba7e7043dc78746ac564ad8bb66db0dbba9f857594@ec2-52-204-196-4.compute-1.amazonaws.com:5432/ddecig7d5fgts3',
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

module.exports = client