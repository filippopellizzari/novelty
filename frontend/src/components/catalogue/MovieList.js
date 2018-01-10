import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';

import Poster from '../Poster'


class MovieList extends React.Component {

  handleSelect(movie){
    this.props.onSelectMovie(movie);
  }

  render(){
    let movies = this.props.movies.map(
      (movie) =>
      <Col xs={6} sm={4} md={3} key={movie.id} >
        <Poster id={movie.id}
          path={movie.poster}
          height="230"
          width="150"
          onClick={ this.handleSelect.bind(this, movie)}
        />
      </Col>
    );

    return(
      <div>
        <Grid fluid={true}>
          <Row>
            {movies}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MovieList;
