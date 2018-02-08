import React from 'react';
import { Pagination } from 'semantic-ui-react';

import PosterCatalogue from './PosterCatalogue'
import admin from '../../data/admin.json';


class MovieList extends React.Component {

  state = { activePage:1}

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  resetComponent() {
    this.setState({activePage: 1})
  }

  handlePaginationChange(e, data){
    this.setState({activePage: data.activePage });
    this.props.onPaginationChange(data.activePage);
  }

  handleSelect(movie){
    this.props.onSelectMovie(movie);
  }

  render(){

    const { activePage } = this.state;
    const { movies, totalResults }  = this.props;

    const moviesPerPage = admin.moviesPerPage
    const totalPages = Math.ceil(totalResults/moviesPerPage)

    var display = totalResults < moviesPerPage ? "none" : "";
    var resultsFound = totalResults < 1 ?
      <h3>Not found</h3> : null

    let movieList = movies.map(
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
            <div className="container">
              {resultsFound}
            </div>
            {movieList}
        </div>
        <div className="row" style={{marginTop:20}}>
          <Pagination
            style={{margin:"auto", display:display}}
            totalPages={totalPages}
            activePage={activePage}
            onPageChange={this.handlePaginationChange.bind(this)}
            firstItem={null}
            lastItem={null}
          />
        </div>
      </div>
    );
  }
}

export default MovieList;
