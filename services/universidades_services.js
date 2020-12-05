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
    `${url}&fields=id,school,location&per_page=12&page=${page}&keys_nested=true`
  );
  let data = await response.json();
  pageIn.innerHTML = `Página: ${data.metadata.page + 1}`;
  console.log(data);
  data.results.map((lilist) => {
    console.log(Object.keys(lilist)[0]);
    var liSchool = document.createElement("li");
    liSchool.classList.add('card-li')
    
    var schoolCity = document.createElement("h2");
    liSchool.appendChild(schoolCity).innerHTML = `${lilist.school.city.toUpperCase()}, ${lilist.school.state}`;

    var schoolName = document.createElement("h1");
    liSchool.appendChild(schoolName).innerHTML = lilist.school.name;

    var hrSchool = document.createElement('hr')
    liSchool.appendChild(hrSchool)

    var schoolSite = document.createElement("a");
    schoolSite.classList.add('link-site')
    schoolSite.target = '_blank'
    schoolSite.innerText = "Link"
    if(lilist.school.school_url.includes("https" || "http")){
        schoolSite.setAttribute('href',`${lilist.school.school_url}`)  
    }else {
        schoolSite.setAttribute('href',`https://${lilist.school.school_url}`)  
    }
    liSchool.appendChild(schoolSite);

    // var schoolState = document.createElement("h2");
    // liSchool.appendChild(schoolState).innerHTML = lilist.school.state;
    ulElement.appendChild(liSchool)
  });
  // return data;
}
montarLista();
