import React from 'react';

const Movie = ({data, onNominate, nominated}) => {
    const {imdbID, Title, Year} = data
    return (
        <div className="movie" id={imdbID}>
            <h5 className="title">{Title}</h5>
            <p className="year">Released: {Year}</p>
            <button className="nominate-btn" onClick={(e) => onNominate(e, data)}>
                {nominated? "Remove" : "Nominate" }
            </button>
        </div>
    );
};

export default Movie;