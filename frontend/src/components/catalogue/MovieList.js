import React from 'react';
import { Pagination } from 'semantic-ui-react';
import axios from 'axios';

import PosterCatalogue from './PosterCatalogue'


class MovieList extends React.Component {

  state = { movies:[], activePage:1, totalPages:1 }

  componentDidMount() {
    this.props.onRef(this);

    axios.get("https://api.themoviedb.org/3/movie/popular?page=1"
    + "&language=en-US&api_key=a070e12e1c6d7b84ebc1b172c841a8bf")
    .then((response) => this.setState({
      movies:response.data.results,
      totalPages:response.data.total_pages
    }))
    .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  resetComponent() {
    this.setState({activePage: 1})
  }

  handlePaginationChange = (e, data) => {
    this.setState({activePage:data.activePage})
    axios.get("https://api.themoviedb.org/3/movie/popular?page="+data.activePage
    + "&language=en-US&api_key=a070e12e1c6d7b84ebc1b172c841a8bf")
    .then((response) => this.setState({
      movies:response.data.results
    }))
    .catch((error) => console.log(error));
  }

  handleSelect(movie){
    this.props.onSelectMovie(movie);
  }

  render(){

    const { movies, activePage, totalPages} = this.state;
    var display = totalPages < 2 ? "none" : "";

    const moviesPerPage = 8;
    const moviePage = movies.slice(0,moviesPerPage);

    let movieList = moviePage.map(
      (movie) =>
      <div className="col-lg-3 col-md-4 col-sm-6" key={movie.id} >
        <PosterCatalogue
          id={movie.id}
          path={movie.poster_path}
          height="230"
          width="150"
          selectedMovies={this.props.selectedMovies}
          onClick={this.handleSelect.bind(this, movie)}
        />
    </div>
    );
    
    return(
      <div className="container">
        <div className="row">
            {movieList}
        </div>
        <div className="row" style={{marginTop:20}}>
          <Pagination
            style={{margin:"auto", display:display}}
            totalPages={totalPages}
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            firstItem={null}
            lastItem={null}
          />
        </div>
      </div>
    );
  }
}

export default MovieList;
