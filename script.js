let numeroPagina = 1;
let LINKAPI = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=98927ddba843b80658a25d9d96781942&page=";
const IMG_PATH= "http://image.tmdb.org/t/p/w500/";
let SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=98927ddba843b80658a25d9d96781942&query=";

let esBusqueda = false;
let busqueda = "";
let query = "";
let barraBusqueda = document.getElementById("barraBusqueda");
let peliculasContainer = document.getElementById("peliculasContainer");
let formBuscar = document.getElementById("form");
let tituloPagina = document.getElementById("titulo");
let anterior = document.getElementById("prev");
let siguiente = document.getElementById("next");

mostrarPeliculas(LINKAPI);

function mostrarPeliculas(url){
    if(!esBusqueda){
        url += numeroPagina;
    }
    activarODesactivarBoton();
    peliculasContainer.innerHTML = "";
    fetch(url).then(res => res.json()).then(function(data){

        if(data.total_pages ==  numeroPagina){
            siguiente.disabled = true;
        }
       
        data.results.forEach((elemento) =>{
            let pelicula = document.createElement("div");
            pelicula.className = "peliculas";
            let imagen = document.createElement("img");
            imagen.className = "imagenPelicula";
            imagen.alt = elemento.title;
            imagen.src = IMG_PATH + elemento.poster_path;
            let tituloPelicula = document.createElement("p");
            tituloPelicula.className = "tituloPelicula";
            tituloPelicula.textContent = elemento.title;
            pelicula.appendChild(imagen);
            pelicula.appendChild(tituloPelicula);
            peliculasContainer.appendChild(pelicula);            
        })
    });
}

function activarODesactivarBoton(){
    if(numeroPagina == 1){
        anterior.disabled = true;
        siguiente.disabled = false;
    }else if (numeroPagina > 1 && numeroPagina < 500){
        anterior.disabled = false;
        siguiente.disabled = false;
    }else if(numeroPagina == 500){
        anterior.disabled = false;
        siguiente.disabled = true;
    }
}

function busquedaONo(){
    if(esBusqueda){
        mostrarPeliculas(query);
    }else{
        esBusqueda = false;
        mostrarPeliculas(LINKAPI);
    }
}
anterior.addEventListener("click",function(){
    if(numeroPagina != 1){
        numeroPagina -= 1;
        if(esBusqueda){
            query = SEARCHAPI + busqueda + "&page=" + numeroPagina;
        }
    }
    busquedaONo();
})

siguiente.addEventListener("click",function(){
    if(numeroPagina < 500){
        numeroPagina += 1;
        if(esBusqueda){
            query = SEARCHAPI + busqueda + "&page=" + numeroPagina;
        }
    }
    busquedaONo();
})

formBuscar.addEventListener("submit",function(e){
    numeroPagina = 1;
    e.preventDefault();
    peliculasContainer.innerHTML = "";
    busqueda = barraBusqueda.value;
    query = SEARCHAPI + busqueda + "&page=" + numeroPagina;
    if(busqueda){
        esBusqueda = true;
        mostrarPeliculas(query);
        barraBusqueda.value = ""
    }else{
        mostrarPeliculas(LINKAPI);
    }
})
tituloPagina.addEventListener("click",function(){
    esBusqueda = false;
    mostrarPeliculas(LINKAPI);
})