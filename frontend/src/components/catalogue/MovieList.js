import React from 'react';

import PosterCatalogue from './PosterCatalogue'


class MovieList extends React.Component {

  handleSelect(movie){
    this.props.onSelectMovie(movie);
  }

  render(){
    let movies = this.props.movies.map(
      (movie) =>
      <div className="col-lg-3 col-md-4 col-sm-6" key={movie.id} >
        <PosterCatalogue
          id={movie.id}
          path={movie.poster}
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
            {movies}
        </div>
      </div>
    );
  }
}

export default MovieList;
