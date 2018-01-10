import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import MovieList from './MovieList'

class Search extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      searched: '',
      sortBy: 'year',
      order: 'desc'
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }

  updateSearch(e){
    this.setState({searched: e.target.value.substr(0,20)})
  }

  updateSort(e){
    this.setState({sortBy: e.target.value})
  }

  updateOrder(){
    var order = (this.state.order === 'desc') ? 'asc' : 'desc'
    this.setState({order: order})
  }

  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  render(){

    let filteredMovies = this.props.movies.filter(
      (movie) => {
        return movie.title.toLowerCase()
          .indexOf(this.state.searched.toLowerCase()) !== -1;
      }
    ).sort(
      this.compareValues(this.state.sortBy, this.state.order)
    );

    var result;
    if(filteredMovies.length>0){
      result = <MovieList movies={filteredMovies}
        onSelectMovie={ (movie) => this.props.onSelectMovie(movie) }/>
    } else {
      result = <h4>Not found</h4>
    }

    return(
      <div>
        <Row>
          <Col>
            <div className="searchBar">
              <input
                type="text"
                value={this.state.search}
                onChange={this.updateSearch}
                placeholder="Search"
              />
            </div>
          </Col>
          <Col>
            <div className="sortBy" style={{marginLeft:20}}>
              <span>Sort by  </span>
              <select onChange={this.updateSort}>
                <option value="year">Release Year</option>
                <option value="title">Title</option>
                <option value="imdb_rating">IMDb Rating</option>
              </select>
            </div>
          </Col>
          <Col>
            <div className="orderButton" style={{marginLeft:20}}>
              <Button
                bsStyle="info"
                bsSize="small"
                onClick={this.updateOrder}>
                {this.state.order}
              </Button>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop:30}}>
        {result}
        </Row>

      </div>

    )
  }
}

export default Search;
