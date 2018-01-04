import React from 'react';
import MovieList from './MovieList'
import {Row, Col, Button} from 'react-bootstrap';

class Search extends React.Component {

  constructor(){
    super();
    this.state = {
      searched: '',
      sortBy: 'year',
      order: 'desc'
    };
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
              <input type="text"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                placeholder="Search"
              />
            </div>
          </Col>
          <Col>
            <div className="sortBy" style={{marginLeft:20}}>
              <span>Sort by  </span>
              <select onChange={this.updateSort.bind(this)}>
                <option value="year">Release Year</option>
                <option value="title">Title</option>
              </select>
            </div>
          </Col>
          <Col>
            <div className="orderButton" style={{marginLeft:20}}>
              <Button bsStyle="info" bsSize="small"
                onClick={this.updateOrder.bind(this)}>
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
