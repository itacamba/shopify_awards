// import React from 'react';

// const Movie = ({data, onNominate, nominated, disabled}) => {
//     const {imdbID, Title, Year} = data
//     return (
//         <div className="movie" id={imdbID}>
//             <h5 className="title">{Title}</h5>
//             <p className="year">Released: {Year}</p>
//             {
//                 nominated?
//                 <button className="nominate-btn" >
//                     Remove
//                 </button>
//                : <button className="nominate-btn disabled">
//                    Nominate
//                </button> 
//             }
//             {/* <button className={disabled === "true"? "nominate-btn disabled" :"nominate-btn"} onClick={(e) => onNominate(e, data)}>
//                 {nominated? "Remove" : "Nominate" }
//             </button> */}
//         </div>
//     );
// };

// export default Movie;

import React from 'react';

const Movie = ({data, onNominate, nominated}) => {
    const {imdbID, Title, Year} = data

    return (
        <div className="movie">
            <h5 className="title">{Title}</h5>
            <p className="year">Released: {Year}</p>
            <button data-id={imdbID} className="nominate-btn" onClick={(e) => onNominate(e, data)}>
                {nominated ? "Remove" : "Nominate" }
            </button> 
        </div>
    );
};

export default Movie;