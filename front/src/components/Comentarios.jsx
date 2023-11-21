import { useState } from "react";

export default ({ val }) => {
    const vote = (id, url) => {
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
            fetch(`http://localhost:9000/api/db/${ url }/` + id, requestInit)
            .then(res => res.text())
            setvoteUpdated(!voteUpdated)
    }

    return(
        <div id='commentar' className="row" key={val.Resenas_ID}>
            <div id='username' className="col-md-3">
                <p>{val.Usuario}</p>
            </div>
            <div id='movie-comment' className="col-md-5">
                <p>{val.comentario}</p>
            </div>
            <div id='votes' className="col-md-4">
                <button id='inc' className={val.upvoted ? 'increase-button' : 'vote-button'} onClick={() => vote(val.Resenas_ID, "incrementar")} ><><FaArrowUp className='vote-icons' /></></button>
                <button id='dec' className={val.downvoted ? 'decrease-button' : 'vote-button'} onClick={() => vote(val.Resenas_ID, "decrementar")}><><FaArrowDown className='vote-icons' /></></button>
                <p>{val.Puntuacion}</p>
            </div>
        </div>
    );
};
