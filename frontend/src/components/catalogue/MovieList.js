import React from 'react';
import { Pagination } from 'semantic-ui-react';

import PosterCatalogue from './PosterCatalogue'


class MovieList extends React.Component {

  state = { activePage: 1 }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  resetComponent() {
    this.setState({activePage: 1})
  }

  handleInputChange = (e, { value }) => this.setState({ activePage: value })

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  handleSelect(movie){
    this.props.onSelectMovie(movie);
  }

  render(){
    const movies = this.props.movies;
    const { activePage } = this.state;
    const totalPages = Math.ceil(movies.length / 8);
    var display = totalPages < 2 ? "none" : "";

    var lastIndex = activePage * 8;
    var firstIndex = lastIndex - 8;
    const moviePage = movies.slice(firstIndex,lastIndex);

    let movieList = moviePage.map(
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

    var noResult = movieList.length < 1 ?
    <h4>No result found</h4> : null

    return(
      <div className="container">
        <div className="row">
            {movieList}
            <div className="container">
              {noResult}
            </div>
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
