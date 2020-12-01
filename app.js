var axios = require('axios');
var express = require('express')

const app = express()

const port = 3003
var key = 'ChDfb7XOnV6TiFoQ15INAyqWxsPWalaIJzB5kWaY';
let url= `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${key}`;

app.get('/', async (req, res) => {
    let unilist;
    await axios.get(url).then((response) => {
        unilist = response.data
    }).catch((error) => {
        console.log('Não deu!')
    })
    console.log(unilist)
    await res.send(unilist)
})
app.get('/schools', async (req, res) => {
    let unilist;
    await axios.get(url+'&fields=id,school.name&per_page=200').then((response) => {
        unilist = response.data
    }).catch((error) => {
        console.log('Não deu!')
    })
    console.log(unilist)
    await res.send(unilist)
})
app.listen(port, () => console.log(`Execuntando na porta ${port}`))
