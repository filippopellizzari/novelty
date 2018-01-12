import React from 'react';
import {Grid} from 'semantic-ui-react';
import Poster from '../Poster'


class MovieList extends React.Component {

  handleSelect(movie){
    this.props.onSelectMovie(movie);
  }

  render(){
    let movies = this.props.movies.map(
      (movie) =>
      <Grid.Column key={movie.id} >
        <Poster
          id={movie.id}
          path={movie.poster}
          height="230"
          width="150"
          onClick={this.handleSelect.bind(this, movie)}
        />
    </Grid.Column>
    );

    var columnsNumber = (movies.length < 4 && movies.length > 0) ?
    movies.length : 4;

    return(
      <div>
        <Grid>
          <Grid.Row columns={columnsNumber}>
            {movies}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default MovieList;
