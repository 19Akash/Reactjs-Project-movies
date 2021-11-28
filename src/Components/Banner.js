import React, { Component } from 'react'
import {movies} from './MoviesData'

export default class Banner extends Component {
    render() {
        let movie = movies.results[0]
        console.log(movie)
        return (
            <>
            { movie === ''?

            <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
            </div>:

            <div className="card banner-card">
                <img className="card-img-top banner-img" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}  alt={movie.title}/>
                    <div className="card-body">
                        <h5 className="card-title banner-title">{movie.title}</h5>
                        <p className="card-text banner-text">{movie.overview}</p>
                        {/* <a href=".." className="btn btn-primary">Go somewhere</a> */}
                    </div>
            </div>
            }
            </>
        )
    }
}
