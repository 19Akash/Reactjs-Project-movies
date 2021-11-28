import React, { Component } from 'react';
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover : '',
            parr:[1],
            currPage:1,
            movies:[],
        }
    }
  async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=08bde841366d3f65d664790f32cbc9f2&language=en-us&page=${this.state.currPage}`)
        let data = res.data
        this.setState({
            movies:[...data.results]
        })
    }
   changeMovies = async()=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=08bde841366d3f65d664790f32cbc9f2&language=en-us&page=${this.state.currPage}`)
    let data = res.data
    this.setState({
        movies:[...data.results]
    })
 }
 handleRight = () =>{
     let temparr = []
     for(let i=1;i<=this.state.parr.length+1;i++)
     {
         temparr.push(i);
     }
     this.setState({
         parr:[...temparr],
         currPage: this.state.currPage+1
     },this.changeMovies)
 }
 handleLeft = () =>{
    if(this.state.currPage>1){
    this.setState({
        currPage: this.state.currPage-1
    },this.changeMovies)
    }
}
handleClick = (e)=>{
    if(this.currPage!=e)
    {
    this.setState({
        currPage: e
    },this.changeMovies)
    }
}

    render() {
        let movie = this.state.movies
        return (
            <>
                {
                    movie.length === 0 ? 
                    <div className="spinner-border text-primary" role="status">
                    <span className="sr-only" style={{color:'black'}}>Loading...</span>
                    </div>:
                 <div>
                    <h1 className="text-center"><strong>Trending</strong></h1>
                    <div className="movie-list">
                        {
                            movie.map((movieObj)=>(     
                            <div className="card movie-card" onMouseEnter={()=>this.setState({hover : movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                <img className="card-img-top movie-img"  src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  alt={movieObj.title}/>
                                    <div className="card-body">
                                        <h5 className="card-title movie-title">{movieObj.title}</h5>
                                        <div className ="button-wrapper" style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                        {
                                            this.state.hover === movieObj.id &&
                                            <a className="btn btn-primary movie-btn">Add to Favourite</a>
                                        }
                                        
                                        </div>
                                 </div>
                            </div>     
                            ))
                        
                        }
                    </div>
                    <div style={{display: 'flex' ,justifyContent:'center'}}>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" onClick={this.handleLeft} >Prev</a></li>
                        {
                            this.state.parr.map((value)=>(
                                <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)} >{value}</a></li>
                            ))
                        }
                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                    </ul>
                    </nav>
                    </div>
                </div>
                }
            </>
        )
    }
}
