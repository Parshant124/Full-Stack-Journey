document.addEventListener('DOMContentLoaded', ()=>{
  const searchInput = document.getElementById("searchBar");
  const searchButton = document.getElementById("search-button");
  const wishlistButton = document.getElementById("wishList-Btn");
  const homeButton = document.getElementById("Home-Btn");
  const trendingMoviesDisplay = document.getElementById("HP-TrendingMovies");
  const searchPage = document.getElementById("Search-Movie-Page");
  const searchMoviesList = document.getElementById("Search-Result");
  const searchedMovieName = document.getElementById("movie-Searched");
  const searchPageNavBtn = document.getElementById("Search-Page-Footer");
  const wishlistPage = document.getElementById("wishList");
  const WLMovieDisplay = document.getElementById("WL-MovieList");
  const wishlistAddBtn = document.getElementById("Add-To-WishList");
  const WLPageNavBtn = document.getElementById("WL-Page-Nav-Btn")

  const API_KEY = "793db41b";
  let trending = [
    "Toy Story 5",
    "Enola Holmes 3",
    "Supergirl",
    "Young Washington",
    "Obsession",
    "Backrooms",
    "Disclosure Day",
    "Voicemails for Isabelle",
    "Little Brother",
    "Retribution",
  ];

  let wishList = JSON.parse(localStorage.getItem('wishList')) || []

  let currentPage = 0;
  let totalPages = 0;
  const windowSize = 7;
  let currMovie;

  let currWLPage = 1;

  async function loadTrendingMovies() {
    const movieElements = await Promise.all(
      trending.map((movie, index) => {
        return renderTrendingMovies(movie, index);
      }),
    );

    movieElements.forEach((movieDiv) => {
      trendingMoviesDisplay.appendChild(movieDiv);
    });
  }
  loadTrendingMovies()

    async function renderTrendingMovies(movie, index) {
    try{
        let resolve = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movie)}`,
        );

        if (!resolve.ok) throw new error("Movie data is not fetched");

        let result = await resolve.json();
        let movieIMDB_ID = result.Search[0].imdbID

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieIMDB_ID}`,
        );

        let data = await response.json();

        let movieDiv = document.createElement("div");
        movieDiv.classList.add("HomePage-Movie");
        movieDiv.innerHTML = `
            <div class="HPMovie-Img">
                <img src="${data.Poster}" alt="" class="HomePage-Poster">
            </div>
            <div class="HPMovieCard-Top">
                <h2 class="HomePage-Title">${data.Title}</h2>
                <h2 class="HomePage-Year">${data.Year}</h2>
            </div>
            <div class="HPMovieCard-Bottom">
                <h2 class="HomePage-Rating">${data.Ratings[0].Value}</h2>
                <button class="HomePage-WishlistAdd" id="">Add to wishlist</button>
            </div>
            <h4 class="HPMovie-Ranking">${index + 1}</h4>
        `;

        movieDiv.addEventListener("click", (e) => {
          const title = data.Title;

          if(e.target.tagName !== "BUTTON") return;
          if (wishList.some(movie => movie.imdbID === data.imdbID)) {
            return;
          }

          const currMovie = {
            imdbID: data.imdbID,
            title,
            status: "Pending",
          };

          wishList.push(currMovie);
          saveToLocale();
        });
        return movieDiv
    } catch(error){
        console.log(error)
    }
  }

  homeButton.addEventListener('click', ()=>{
    console.log("clicked")
    trendingMoviesDisplay.classList.remove("hidden");
    wishlistPage.classList.add("hidden");
    searchPage.classList.add("hidden");

    searchInput.value = ""
  })

  searchButton.addEventListener('click', async()=>{
    trendingMoviesDisplay.classList.add('hidden');
    wishlistPage.classList.add('hidden');
    searchPage.classList.remove('hidden');
    const movie = searchInput.value.trim();

    if(movie === "") return

    searchMoviesList.innerHTML = "";
    searchPageNavBtn.innerHTML = "";
    currentPage = 1;
    try{
    searchedMovieName.textContent = movie;
    const data = await renderSearchMovies(movie)

    let movieNumb = data.totalResults
    totalPages = parseInt(movieNumb/10);
    if(movieNumb%10) totalPages++;

    generateSearchBtn(currentPage)
    currMovie = movie;
    }catch(error){
        let warn = document.createElement('h1')
        warn.textContent = "No matched results"
        searchMoviesList.appendChild(warn);
    }
  })

  searchPageNavBtn.addEventListener('click', async(e)=>{
    if(e.target.tagName !== "BUTTON") return;

    let pressedBtn = parseInt(e.target.id);
    if(pressedBtn === currentPage) return;

    currentPage = pressedBtn;

    searchMoviesList.innerHTML = "";
    searchPageNavBtn.innerHTML = "";
    let data = await renderSearchMovies(currMovie)
    generateSearchBtn(currentPage)
  })

  function generateSearchBtn(currButton){
    let side = parseInt(windowSize/2);
    if(currButton - side < 0){
        let endPage = windowSize;
        if(windowSize > totalPages) endPage = totalPages
        for(let i=1; i<=endPage; i++){
            let button = document.createElement("BUTTON");
            button.id = i;
            button.textContent = i;
            searchPageNavBtn.appendChild(button);
        }
    }else if(currButton + side > totalPages){
        let endPage = windowSize;
        if (windowSize > totalPages) endPage = totalPages;
        for(let i=totalPages-endPage+1; i<=totalPages; i++){
            let button = document.createElement("BUTTON");
            button.id = i;
            button.textContent = i;
            searchPageNavBtn.appendChild(button);
        }
    }else{
        for(let i=currButton-side; i<=currButton+side; i++){
            let button = document.createElement("BUTTON");
            button.id = i;
            button.textContent = i;
            searchPageNavBtn.appendChild(button);
        }
    }
  }

  async function renderSearchMovies(movie){
    try{
        let response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movie)}&page=${currentPage}`,
        );
       
        if(!response.ok) throw error("Error Occured");
        let result = await response.json()

        for(let i=0; i<10; i++){
            let movieIMDB_ID = result.Search[i].imdbID;

            const response = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieIMDB_ID}`,
            );

            let data = await response.json();

            let movieDiv = document.createElement("div");
            movieDiv.classList.add("Search-Movie");
            const errorImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlFUPZT2B3hq4nYVPbpvQ6re99DOqvCVF0tgJ_8zCHOw&s=10"
            movieDiv.innerHTML = `
                <div>
                    <img src="${data.Poster || errorImg}" alt="">
                </div>
                <div class="SM-details">
                    <h2>${data.Title}</h2>
                    <div class="Search-Movie-div">
                        <h4>${data.Ratings[0].Value}</h4>
                        <h4>${data.Year}</h4>
                    </div>
                    <button id="Add-To-WishList">Add to WishList</button>
                </div>
            `;
            searchMoviesList.appendChild(movieDiv)
            movieDiv.addEventListener("click", (e) => {
              const title = data.Title;
              if(e.target.tagName !== "BUTTON") return;

              if (wishList.some(movie => movie.imdbID === data.imdbID)) {
                return;
              }

            const currMovie = {
              imdbID: data.imdbID,
              title,
              status: "Pending",
            };

            wishList.push(currMovie);
            saveToLocale();
            })
        }
        return result
    }
    catch(error){
        console.log(error)
    }
  }

  wishlistButton.addEventListener('click', ()=>{
    trendingMoviesDisplay.classList.add('hidden');
    searchPage.classList.add('hidden');
    wishlistPage.classList.remove('hidden');

    if(!wishList.length){
      let h1 = document.createElement("h1");
      h1.textContent = "Your WatchList is Empty"

      WLMovieDisplay.appendChild(h1)
    }
    else{
      console.log("else")
      currWLPage = 1;
      renderWLMovies(currWLPage)
      generateWLbtn(currWLPage)}
  })

  function saveToLocale(){
    localStorage.setItem('wishList', JSON.stringify(wishList))
  }

  function generateWLbtn(currPage){
    WLPageNavBtn.innerHTML = ""
    if(wishList.length <= 10) return
    let side = parseInt(windowSize / 2);
    let totalPage = wishList.length / 10;
    if(wishList.length % 10) totalPage++;

    if(totalPage <= 1) return;
    if (currPage - side < 0) {
      let endPage = windowSize;
      if (windowSize > totalPage) endPage = totalPage;
      for (let i = 1; i <= endPage; i++) {
        let button = document.createElement("BUTTON");
        button.id = i;
        button.textContent = i;
        WLPageNavBtn.appendChild(button);
      }
    } else if (currPage + side > totalPage) {
      let endPage = windowSize;
      if (windowSize > totalPage) endPage = totalPage;
      for (let i = totalPages - endPage + 1; i <= totalPage; i++) {
        let button = document.createElement("BUTTON");
        button.id = i;
        button.textContent = i;
        WLPageNavBtn.appendChild(button);
      }
    } else {
      for (let i = currPage - side; i <= currPage + side; i++) {
        let button = document.createElement("BUTTON");
        button.id = i;
        button.textContent = i;
        WLPageNavBtn.appendChild(button);
      }
    }
  }

  async function renderWLMovies(currPage){
    WLMovieDisplay.innerHTML = ""
    let endMovie = wishList.length;

    if(currPage*10 < endMovie) endMovie = currPage*10;

    for(let i = currPage*10-10; i<endMovie; i++){
      console.log("Loop")
      let movieDiv = document.createElement('div');
      movieDiv.classList.add("WL-Movie");

      let WLmovieId = wishList[i].imdbID

      console.log("fetched");
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${WLmovieId}`)
      if(!response.ok) continue;
      let data = await response.json();

      movieDiv.innerHTML = `
        <div class="WL-poster-div">
            <img
              src="${data.Poster}"
              alt=""
              class="WL-poster"
            />
        </div>
        <div class="WL-title">
          <h4>${data.Title}</h4>
          <h5>${data.Year}</h5>
        </div>
        <div class="WL-status">
          <h4>Status: <span class="WL-pending status-msg">${wishList[i].status}</span></h4>
          <button class="status-btn">Watched</button>
        </div>
        <div class="WL-remove-btn">
          <button class="WL-remove">remove from wishlist</button>
        </div>
      `
      WLMovieDisplay.appendChild(movieDiv);

      movieDiv.addEventListener('click', (e)=>{
        if(e.target.tagName !== "BUTTON") return;

        if(e.target.classList.contains("status-btn")){
          const statusMsg = movieDiv.querySelector(".status-msg");
          const statusBtn = movieDiv.querySelector(".status-btn")

          statusMsg.classList.toggle("WL-pending");
          statusMsg.classList.toggle("WL-completed");

          if(wishList[i].status === "pending"){
            statusMsg.textContent = "Watched";
            wishList[i].status = "Watched";
            statusBtn.textContent = "Pending"

          }else{
            statusMsg.textContent = "Pending";
            wishList[i].status = "Pending";
            statusBtn.textContent = "Watched";
          }
          saveToLocale();

        }
        else if(e.target.classList.contains("WL-remove")){
          wishList.splice(i, 1);
          movieDiv.remove();
          saveToLocale()
        }
      })
    }
  }
})
