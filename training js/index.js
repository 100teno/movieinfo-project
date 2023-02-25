let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//função para buscar no api

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    // se o campo de pesquisa estiver vazio

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }

    //se o campo de pesquisa não estiver vazio
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            // se o filme existir na database
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <h3>Plot:</h3>
                  <p>${data.Plot}</p>
                  <h3>Cast:</h3>
                  <p>${data.Actors}</p>
                `;
            }

            //se o filme nao existir na data base
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //se o erro acontecer
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);