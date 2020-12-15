const key = "ChDfb7XOnV6TiFoQ15INAyqWxsPWalaIJzB5kWaY";
const url = `https://api.data.gov/ed/collegescorecard/v1/schools?keys_nested=true&api_key=${key}`
let ulList = [];
let pageCount = 0;
let search = document.getElementById("search");
let matchList = document.getElementById("match-list");
let page = 0;


// Search the universities and filter it 
const searchUni = async searchText => {

    let res = await fetch(
        `${url}&&fields=id,latest,school,location&per_page=12&page=${page}&keys_nested=true`
    );
    let data = await res.json();
    console.log(data);
    // Separating 
    ulList = data.results.map((lilist, index) => {
        const { name, city, state, consumer_rate, earnings, expenses, url } = lilist;
        return {
            id: index,
            name: lilist.school.name,
            city: lilist.school.city,
            state: lilist.school.state,
            consumer_rate: lilist.latest.completion.consumer_rate,
            earnings: lilist.latest.earnings['6_yrs_after_entry'].median,
            expenses: lilist.latest.cost.avg_net_price.overall,
            url: lilist.school.school_url

        }
    });
    console.log(ulList)

    // get matches to current text input 
    let matches = ulList.filter(school => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return school.name.match(regex);

    });
    if (searchText.length == 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    console.log(matches);
    outputHtml(matches);

};

//show results in HTML
function dadosUniversidade(event) {
    console.log("cheguei aqui");
    console.log(event.getAttribute("id"));
    let name = document.getElementById('universityName');
    let website = document.getElementById('universityWebsite');
    let address = document.getElementById('universityAddress');
    let graduationRate = document.getElementById('graduationRate');
    let initialSalary = document.getElementById('initialSalary');
    let annualCost = document.getElementById('annualCost');

    let universityData = ulList.map(singleData => {
        console.log(`My id ${singleData.id} `);
        if (singleData.id == event.getAttribute("id")) {
            name.innerHTML = singleData.name;
            website.innerHTML = singleData.url;
            address.innerHTML = `${singleData.city} - ${singleData.state}`
            graduationRate.innerHTML = singleData.consumer_rate;
            initialSalary.innerHTML = singleData.earnings;
            annualCost.innerHTML = singleData.expenses;
        }
    });

}
const outputHtml = matches => {
    console.log(matches.length)
    if (matches.length > 0) {
        const html = matches.map(match => `<div onclick="dadosUniversidade(this)" id="${match.id}" class='card card-body mb-1'><h6>${match.name}<span class="text-primary">(${match.state})</span></h6></div>`).join('');
        matchList.innerHTML = html;
    }
};


search.addEventListener('input', () =>
    searchUni(search.value)
);




function newElement() {
    var li = document.createElement("li");
    var nome = document.getElementById("nome").value;
    var comentario = document.getElementById("comentario").value;
    var email = document.getElementById("email").value;
    if (nome === '') {
        alert("Digite seu Nome!");
    } else if (email === '') {
        alert("Digite seu Email!");
    } else if (comentario === '') {
        alert("Digite seu comentario!");
    } else {
        document.getElementById("reviews-list").appendChild(li);
    }
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("comentario").value = "";

    var divReview = document.createElement("div");
    var divNome = document.createElement("div");
    var divComentario = document.createElement("div");

    divReview.className = "review";
    divNome.className = "nome-review";
    divComentario.className = "comentario-review";

    var nomeNode = document.createTextNode(nome);
    var comentarioNode = document.createTextNode(comentario);

    divNome.appendChild(nomeNode);
    divComentario.appendChild(comentarioNode)

    divReview.appendChild(divNome);
    divReview.appendChild(divComentario);

    li.appendChild(divReview);


}

