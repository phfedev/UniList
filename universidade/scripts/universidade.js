function get_info(){
    
}

function newElement() {
    var li = document.createElement("li");
    var nome = document.getElementById("nome").value;
    var comentario = document.getElementById("comentario").value;
    var email = document.getElementById("email").value;
    if (nome === '') {
        alert("Digite seu Nome!");
    } else if(email === ''){
        alert("Digite seu Email!");
    } else if(comentario ===''){
        alert("Digite seu comentario!");
    }else {
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

get_info();