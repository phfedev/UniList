// var axios = require('axios');

const key = "ChDfb7XOnV6TiFoQ15INAyqWxsPWalaIJzB5kWaY";
const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${key}`;
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
       ulElement.innerHTML = ''
    }
  let response = await fetch(
    `${url}&fields=id,school.name&per_page=20&page=${page}`
  );
  let data = await response.json();
  pageIn.innerHTML = `Página: ${data.metadata.page + 1}`;
  console.log(data);
  data.results.map((lilist) => {
    console.log(Object.keys(lilist)[0]);
    var li = document.createElement("li");
    
    ulElement.appendChild(li).innerHTML = lilist["school.name"];
  });
  // return data;
}
montarLista();
