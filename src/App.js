import React, {useState} from 'react';

import './App.css';
import Movie from './components/Movie';

function App() {

const [search, setSearch ] = useState('')
const [movies, setMovies] = useState([])
// const [nominations, setNominations] = useState(0)
const [nominated, setNominated] = useState([])

 const fetchMovies = (e) => {
   e.preventDefault()
   if(search === "") return
   fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=be887243&s=${search}&type=movie`)
   .then(resp => resp.json())
   .then(data => {
      // Filter to only display first 10 results
      let newMovies = data.Search.filter((mov, i) => i < 10 )
      setMovies(newMovies)
      // clear search input
      setSearch("")
      // display error when no search input
    // error handling when movie not found (try-catch)

    // make sure all buttons are disabled if movies are not nominated
    let moviesContainer = Array.from(document.querySelector('.movies-container').children)
    moviesContainer.forEach( movie => {
      let movieBtn = movie.getElementsByTagName('button')[0]
      // remove the 'disabled' class for all newMovies
      movieBtn.classList.remove('disabled')

      nominated.forEach(nominated => {
        // if any 'nominated' movie is in the newMovies, then add the 'disabled' button
        if(nominated.imdbID === movieBtn.dataset.id){
          movieBtn.classList.add('disabled')
        }
      })
    })
    

   })
   
 } 

 const addNomination = (e, movieData) => {
   if(nominated.length < 5){
    //  if(e.target.dataset.id === movieData.imdbID){
        // disable button (prevents click)
        let targetBtn = document.querySelectorAll(`[data-id=${movieData.imdbID}]`)[0]
        targetBtn.classList.add('disabled')
        // add to nominated
        let newNominated = [...nominated, movieData]
        // sets the state
        setNominated(newNominated)
    //  }
   } // else show message showing theres no space
 }

 const removeNomination = (e, movieData) => {
  // filter out the selected movie
  let filteredMovies = nominated.filter(mov => mov.imdbID !== movieData.imdbID)
  // sets the state with filteredMovies
  setNominated(filteredMovies)
  // find button with same id as movie
  let disabledBtn = document.querySelectorAll(`[data-id=${movieData.imdbID}]`)[0]
  // remove 'disabled' class
  disabledBtn.classList.remove('disabled')
 }

  return (
    <div className="App">
      <header>
        <h1>The Shoppies Awards</h1>
        <p>Nominate your top five favorite movies</p>
      </header>

      <form action="" onSubmit={fetchMovies} id="search-form">
          <p>Movie title</p>
          <div className="search-bar">
            <input type="text" name="movie-search" id="movie" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="search-icon" onClick={fetchMovies}><i className="fas fa-search"></i></div>
            <input type="submit" value="Search"/>
          </div>
      </form>

      <div className="results">
        <div className="movies-container">
          {movies.map((mov, i) => {
            return <Movie key={i} data={mov} onNominate={addNomination} nominated={false} />
          })}
        </div>

        <div className="nominated-container">
            <h3>Your Nominations</h3>
            <div className="nominated">
              {nominated.map((mov, i) => {
                return <Movie key={i} data={mov} onNominate={removeNomination} nominated={true} />
              })}
            </div>
        </div>
      </div>

    </div>
  );
}

export default App;
