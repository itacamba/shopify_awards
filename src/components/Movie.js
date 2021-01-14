import React from 'react';

const Movie = ({data, onNominate, nominated}) => {
    const {imdbID, Title, Year, Poster} = data

    return (
        <div className="movie">
            <div className="movie-poster">
                {/* if poster does not exist, then use default image */}
                <img src={Poster === "N/A"? "https://media.comicbook.com/files/img/default-movie.png" : Poster} alt=""/>
            </div>
            <div className="movie-info">
                <h5 className="title">{Title}</h5>
                <p className="year">Released: {Year}</p>
                <button data-id={imdbID} className="nominate-btn" onClick={(e) => onNominate(e, data)}>
                    {nominated ? "Remove" : "Nominate" }
                </button> 
            </div>
        </div>
    );
};

export default Movie;