import React, {useState} from 'react';

import './App.css';
import Movie from './components/Movie';
import useLocalStorage from "./hooks/useLocalStorage"

function App() {

// form controlled by state
const [search, setSearch ] = useState('')
// movies searched
const [movies, setMovies] = useState([])
// nominated movies
const [nominated, setNominated] = useLocalStorage('movies', [])

const [searchTerm, setSearchTerm] = useState('')

 const fetchMovies = (e) => {
   e.preventDefault()
   // error handling when no input is given
   if(search === "") return 
   fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=be887243&s=${search}&type=movie`)
   .then(resp => resp.json())
   .then(data => {
      // 'Results for ' state.
      setSearchTerm(`for "${document.getElementById('search-term').value}"`)
      // clear search input
      setSearch("")
      // error handling for response
      if(data.Response === "False") {
        displayError(data.Error)
        setMovies([])
        return
      }
      // Save Movies in State
      setMovies(data.Search)
      // make sure all buttons are disabled if movies are not nominated
      let moviesContainer = Array.from(document.querySelector('.movie-results').children)
      moviesContainer.forEach( movie => {
        let movieBtn = movie.getElementsByTagName('button')[0]
        // remove the 'disabled' class for all newMovies
        movieBtn.classList.remove('disabled')

        nominated.forEach(nominated => {
          // if any 'nominated' movie is in the left-column, then add the 'disabled' button
          if(nominated.imdbID === movieBtn.dataset.id){
            movieBtn.classList.add('disabled')
          }
        })
      })
    })
  } 

 const addNomination = (e, movieData) => {
   if(nominated.length < 5){
        // disable button (prevents click)
        let targetBtn = document.querySelectorAll(`[data-id=${movieData.imdbID}]`)[0]
        targetBtn.classList.add('disabled')
        // add to nominated list
        let newNominated = [...nominated, movieData]
        // sets the state with new nomination
        setNominated(newNominated)
   } else { // else show message 'limit of nominations'
      displayError('You have already nominated 5 movies')
   }
   
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
  
  
  const displayError = (message) => {
  // display div and add message
   let popUp = document.querySelector('.error-nominations')
   popUp.style.display = "flex"
   popUp.innerText = `Error - ${message}`
   // hide div
   setTimeout(() => {
     popUp.style.display = "none"
   }, 2000)
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
            <input type="text" name="movie-search" id="search-term" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="search-icon" onClick={fetchMovies}><i className="fas fa-search"></i></div>
          </div>
      </form>

      <div className="results">
        <div className="movies-container">
          <h3>Results {searchTerm}</h3>
          <div className="movie-results">
            {movies.map((mov, i) => {
              return <Movie key={i} data={mov} onNominate={addNomination} nominated={false} />
            })}
          </div>
        </div>

        <div className="nominated-container">
            <h3>Your Nominations - {nominated.length}</h3>
            <div className="nominated">
              {nominated.slice(0).reverse().map((mov, i) => {
                return <Movie key={i} data={mov} onNominate={removeNomination} nominated={true} />
              })}
            </div>
        </div>
      </div>
      <div className="error-nominations">
      </div>
    </div>
  );
}

export default App;
