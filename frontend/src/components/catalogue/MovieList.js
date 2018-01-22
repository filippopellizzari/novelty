import React from 'react';

import Poster from '../Poster'


class MovieList extends React.Component {

  handleSelect(movie){
    this.props.onSelectMovie(movie);
  }

  render(){
    let movies = this.props.movies.map(
      (movie) =>
      <div className="col-lg-3 col-md-4 col-sm-6" key={movie.id} >
        <Poster
          id={movie.id}
          path={movie.poster}
          height="230"
          width="150"
          onClick={this.handleSelect.bind(this, movie)}
        />
    </div>
    );

    return(
      <div>
        <div className="container">
          <div className="row">
              {movies}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
