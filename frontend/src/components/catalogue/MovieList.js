import React from 'react';
import { Pagination } from 'semantic-ui-react';

import PosterCatalogue from './PosterCatalogue'


class MovieList extends React.Component {

  state = { activePage:1 }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  resetComponent() {
    this.setState({activePage: 1})
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  handleSelect(movie){
    this.props.onSelectMovie(movie);
  }

  render(){

    const { activePage } = this.state;
    const {totalPages, movies}  = this.props;
    console.log(totalPages)
    var display = totalPages < 2 ? "none" : "";

    const moviesPerPage = 8;
    var lastIndex = activePage * moviesPerPage;
    var firstIndex = lastIndex - moviesPerPage;
    const moviePage = movies.slice(firstIndex,lastIndex);

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
