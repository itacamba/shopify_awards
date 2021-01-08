import React, {useState} from 'react';

import './App.css';
import Movie from './components/Movie';

function App() {

const [search, setSearch ] = useState('')
const [movies, setMovies] = useState([])

 const fetchMovies = (e) => {
   e.preventDefault()
   fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=be887243&s=${search}&type=movie`)
   .then(resp => resp.json())
   .then(data => {
     // Filter to only display first 10 results
     let newMovies = data.Search.filter((mov, i) => i < 10 )
     // Add Key-Value pair to results, to keep control of nominations
     let notNominatedMovies = newMovies.map(mov => ({...mov, Nominated: false}))
     setMovies(notNominatedMovies)

    // display error when no search input
    // error handling when movie not found (try-catch)
   })
 } 
 const handleNomination = (e, movieData) => {
  // 1. Get Index of the movie that will change
  let movieIdx = movies.findIndex(movie => movie.imdbID === movieData.imdbID)
  // 2. make a copy of movies
  let allMovies = [...movies]
  // 3. make a copy of the movie I want to change
  let movie = {...allMovies[movieIdx]}
  // 4. change the Nominated property
  movie.Nominated = !movieData.Nominated
  // 5. put it back into the array
  allMovies[movieIdx] = movie
  // 6. Set State with modified array
  setMovies(allMovies)
 }



 console.log(movies)
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
            <div className="search-icon"><i className="fas fa-search"></i></div>
            <input type="submit" value="Search"/>
          </div>
      </form>
      <div className="results">
        <div className="movies-container">
          {movies.map((mov, i) => {
            // if movie is nominated then don't show it in this column
            return mov.Nominated?  null : <Movie key={i} data={mov} nominated={mov.Nominated} onNominate={handleNomination}/> 
          })}
        </div>
        <div className="nominated-container">
            <h3>Your Nominations</h3>
            <div className="nominated">
              {movies.map((mov, i) => {
                // if movie is nominated then show it in this column
                return mov.Nominated? <Movie key={i} data={mov} nominated={mov.Nominated} onNominate={handleNomination}/> : null
              })}
            </div>
        </div>
      </div>

    </div>
  );
}

export default App;
