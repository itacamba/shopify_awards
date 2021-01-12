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
   fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=be887243&s=${search}&type=movie`)
   .then(resp => resp.json())
   .then(data => {
     // Filter to only display first 10 results
     let newMovies = data.Search.filter((mov, i) => i < 10 )
     // Add Key-Value pair to results, to keep control of nominations
     let notNominatedMovies = newMovies.map(mov => ({...mov, Nominated: false}))
     setMovies(notNominatedMovies)
    // clear search input
    // display error when no search input
    // error handling when movie not found (try-catch)
   })
   
 } 
//  const handleNomination = (movieData) => {
//   // 1. Get Index of the movie that will get nominated {Nominated: True or False}
//   let movieIdx = movies.findIndex(movie => movie.imdbID === movieData.imdbID)
//   console.log('index: ', movieIdx)
//   // 2. make a copy of all movies
//   let allMovies = [...movies]
//   // 3. make a copy of the movie I will nominate or remove from nominated
//   let movie = {...allMovies[movieIdx]}
//   // 4. change the Nominated property
//     if(movie.Nominated){
//       movie.Nominated = false
//       // remove from 'nominated' state
//       let filtered = nominated.filter(mov => mov.imdbID !== movieData.imdbID)
//       console.log('filtered: ',filtered )
//       // setNominated([...nominated, ])
//     } else {
//       if(nominated.length < 5){
//       movie.Nominated = true
//       // add to 'nominated' state
//       console.log('nominating: ', movie.Title)
//       setNominated([...nominated, movie])
//       }
//     }
//   // 5. put the movie back into the array
//   allMovies[movieIdx] = movie
//   // 6. Set State with modified array
//   setMovies(allMovies)
//  }

 const addNomination = (e, movieData) => {
   if(nominated.length < 5){
        // disable button (prevents click)
        e.target.classList.add('disabled')
        // add to nominated
        let newNominated = [...nominated, movieData]
        // sets the state
        setNominated(newNominated)
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
          // // if Movie is Nominated
          //  return mov.Nominated? 
          //   <Movie key={i} data={mov} onNominate={removeNomination}/> 
          //   : 
          //   <Movie key={i} data={mov} onNominate={addNomination}/> 
          })}
        </div>

        <div className="nominated-container">
            <h3>Your Nominations</h3>
            <div className="nominated">
              {nominated.map((mov, i) => {
                return <Movie key={i} data={mov} onNominate={removeNomination} nominated={true} />
                // // if the 'nominated' list is more than 5, then don't add anything
                // if(nominated.length > 5){
                //   return false;
                // } else { // else add the movie to 'nominated'
                //   // if movie is nominated then show it in this div
                //   return mov.Nominated? <Movie key={i} data={mov} nominated={mov.Nominated} onNominate={handleNomination}/> : null
                // }
              })}
            </div>
        </div>
      </div>

    </div>
  );
}

export default App;
