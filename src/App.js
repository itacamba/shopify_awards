import React, {useState} from 'react';

import './App.css';

function App() {

const [search, setSearch ] = useState('')
const [movies, setMovies] = useState([])

 const fetchMovies = (e) => {
   e.preventDefault()
   fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=be887243&s=${search}&type=movie`)
   .then(resp => resp.json())
   .then(data => {
     let newMovies = data.Search.filter((mov, i) => i < 10 )
     setMovies(newMovies)
    // display error when no search input
    // error handling when movie not found (try-catch)
   })
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
            <input type="submit" value="Search"/>
          </div>
      </form>
      <div className="results">
        {movies.map((mov, i) => {
          return <div key={i} className="movie">
                    <h5>{mov.Title}</h5>
                    <p>Released: {mov.Year}</p>
                    <button className="nominate-btn">Nominate</button>
                  </div>
        })}
      </div>
    </div>
  );
}

export default App;
