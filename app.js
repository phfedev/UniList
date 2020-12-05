var axios = require('axios');
var express = require('express')
// import getListaUniversidades from './services/universidades_services'
var {getListaUniversidades} = require('./services/universidades_services')

const app = express()
// const listagem = await getListaUniversidades()

const port = 3003
var key = 'ChDfb7XOnV6TiFoQ15INAyqWxsPWalaIJzB5kWaY';
let url= `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${key}`;

app.get('/', async (req, res) => {
    let unilist = await getListaUniversidades();
    await res.send(unilist)
})

app.listen(port, () => console.log(`Execuntando na porta ${port}`))
