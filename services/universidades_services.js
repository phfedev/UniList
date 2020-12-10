// var axios = require('axios');

const key = "ChDfb7XOnV6TiFoQ15INAyqWxsPWalaIJzB5kWaY";
/*const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${key}`;*/
const url =`https://api.data.gov/ed/collegescorecard/v1/schools?keys_nested=true&api_key=${key}`
let ulList = [];
let ulElement = document.getElementById("listUl");
let pageCount = 0;
let pageIn = document.getElementById("pageIn");
let pageNext = document.getElementById("pageNext");
let pagePrev = document.getElementById("pagePrev");
pageNext.addEventListener("click", () => {
  montarLista(++pageCount);
});
pagePrev.addEventListener("click", () => {
  if (pageCount > 0) {
    montarLista(--pageCount);
  }
});

//Busca a lista de universidades da api
async function montarLista(page = 0) {
  if (ulElement.hasChildNodes()) {
    ulElement.innerHTML = "";
  }
  let response = await fetch(
    /*`${url}&fields=id,school,location&per_page=12&page=${page}&keys_nested=true`*/
    `${url}&&fields=id,latest,school,location&per_page=12&page=${page}&keys_nested=true`
  );
  let data = await response.json();

  pageIn.innerHTML = `Página: ${data.metadata.page + 1}`;
  
  data.results.map((lilist, index) => {
    /*console.log(lilist.latest);*/
    /*console.log(Object.keys(lilist)[0]);*/
    var liSchool = document.createElement("li");
    liSchool.classList.add("card-li");

    var schoolCity = document.createElement("h2");
    liSchool.appendChild(
      schoolCity
    ).innerHTML = `${lilist.school.city.toUpperCase()}, ${lilist.school.state}`;

    var schoolName = document.createElement("h1");
    liSchool.appendChild(schoolName).innerHTML = lilist.school.name;

    var divSchool = document.createElement("div");
    divSchool.classList.add("solid");
    liSchool.appendChild(divSchool);

    var destaquesSchool = document.createElement("h3");
    destaquesSchool.innerHTML = `<b>Destaques:</b>`;
    liSchool.appendChild(destaquesSchool);
    var taxaSchool = document.createElement("h3");
    var consumer_rate = lilist.latest.completion.consumer_rate;
    /*console.log(consumer_rate);*/
    if (consumer_rate == null){
      consumer_rate = 'N/A';
      percent = "";
    } else{
      consumer_rate = Math.round(consumer_rate*100);
      percent = "%";
    }
    taxaSchool.innerHTML = `Taxa de graduação: <span>${consumer_rate}${percent}</span>`;
    liSchool.appendChild(taxaSchool);
    var salarioSchool = document.createElement("h3");
    var earnings = lilist.latest.earnings['6_yrs_after_entry'].median;
    console.log(earnings);
    if (earnings == null){
      dolar = "";
      earnings = 'N/A';
      thousand = "";
    } else{
      dolar = "$";
      earnings = Math.round(earnings/1000);
      thousand = "k";
    }
    salarioSchool.innerHTML = `Salário médio pós-termino: <span>${dolar}${earnings}${thousand}</span>`;
    liSchool.appendChild(salarioSchool);
    var custoSchool = document.createElement("h3");
    var expenses = lilist.latest.cost.avg_net_price.overall;
    if (expenses == null){
      dolar ="";
      expenses = 'N/A';
      thousand = "";
    } else{
      dolar ="$";
      expenses = Math.round(expenses/1000);
      thousand = "k";
    }
    custoSchool.innerHTML = `Custo médio anual: <span>${dolar}${expenses}${thousand}</span>`;
    liSchool.appendChild(custoSchool);

    var schoolSite = document.createElement("a");
    schoolSite.classList.add("link-site");
    schoolSite.target = "_blank";
    schoolSite.innerText = "Link";
    if (lilist.school.school_url.includes("https" || "http")) {
      schoolSite.setAttribute("href", `${lilist.school.school_url}`);
    } else {
      schoolSite.setAttribute("href", `https://${lilist.school.school_url}`);
    }
    liSchool.appendChild(schoolSite);

    // var schoolState = document.createElement("h2");
    // liSchool.appendChild(schoolState).innerHTML = lilist.school.state;
    ulElement.appendChild(liSchool);
  });
  // return data;
}
montarLista();

