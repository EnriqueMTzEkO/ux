import React from 'react'
import '../index.css';
import { Outlet, Link } from 'react-router-dom';

export const SearchResults = ({filtro}) => {

const deletefiltro = () => {
    setFiltro('')
}

  return (
    <div className='show-list'>
        <ul className='results-list'>
            {filtro !=='' && filtro.map((filtro, id) =>{
                return(
                <li className='search-list my-2 mx-2' key={id}>
                    <Link className='search-movie' onClick={() => deletefiltro()} to={`/detalles/${filtro.id}`}>
                        <p>{filtro.title}</p>
                        <img className='search-img'
                        src={`https://image.tmdb.org/t/p/w300${filtro.poster_path}`}
                        alt={filtro.title}
                        />
                        <p>Estreno: {filtro.release_date}</p>
                    </Link>
                </li>);
            })}
        </ul>
    </div>
  )
};
