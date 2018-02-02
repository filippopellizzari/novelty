import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Button, Icon, Dropdown } from 'semantic-ui-react';
import {Input} from 'semantic-ui-react';
import axios from 'axios';

import compareValues from "../../utils/compareValues";
import admin from '../../data/admin.json';
import MovieList from './MovieList';


class SearchCatalogue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'popularity',
      order: 'descending',
      isLoading: false,
      popularMovies: [],
      searchResults: [],
      value:""
    };
    this.updateSort = this.updateSort.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.setState({value:""});
    for (var page = 2; page < 20; page++) {
      axios.get("https://api.themoviedb.org/3/movie/popular?page=" + page +
      "&language=en-US&api_key=" + admin.tmdb_key)
      .then((response) => this.setState({
        popularMovies: [
          ...this.state.popularMovies, response.data.results
        ],
        searchResults: [
          ...this.state.searchResults, response.data.results
        ],
      }));
    }
  }

  updateSort(e, data) {
    this.setState({sortBy: data.value});
    this.child.resetComponent();
  }

  updateOrder() {
    var order = (this.state.order === 'descending')
      ? 'ascending'
      : 'descending'
    this.setState({order: order})
    this.child.resetComponent();
  }

  handleSearch(e){
    if(e.key==='Enter'){
      const value = e.target.value
      this.setState({isLoading: true, value: value})
      setTimeout(() => {
        axios.get("https://api.themoviedb.org/3/search/movie?include_adult=false" +
        "&page=1&query=" + value + "&language=en-US&api_key=" + admin.tmdb_key)
        .then((response) => this.setState({
          searchResults:response.data.results
        }))
      this.setState({isLoading: false});
      }, 500)
      this.child.resetComponent();
    }
  }

  reset(e){
    if (e.target.value < 1){
      this.setState({value:"", searchResults:this.state.popularMovies})
    }
  }

  render() {

    const {isLoading, searchResults} = this.state

    const sortOptions = [
      {
        key: 'popularity',
        value: 'popularity',
        text: 'Popularity'
      },
      {
        key: 'release_date',
        value: 'release_date',
        text: 'Release Year'
      },
      {
        key: 'title',
        value: 'title',
        text: 'Title'
      }
    ]

    const movieList = [].concat.apply([], searchResults);
    const filteredMovies = movieList.sort(
      compareValues(this.state.sortBy, this.state.order)
    );

    return (<div>
      <Row>
        <Col>
          <div style={{marginLeft: 20}}>
            <Input
              icon='search'
              placeholder='Search'
              loading={isLoading}
              onKeyPress={this.handleSearch}
              onChange={this.reset}
            />
          </div>
        </Col>
        <Col>
          <div className="sortBy" style={{marginLeft: 20}}>
            <Dropdown
              onChange={this.updateSort}
              placeholder='Sort by'
              selection
              options={sortOptions}
            />
          </div>
        </Col>
        <Col>
          <div className="orderButton" style={{marginLeft: 20}}>
            <Button
              icon
              onClick={this.updateOrder}
            >
              <Icon name={"sort content " + this.state.order}/>
            </Button>
          </div>
        </Col>
      </Row>
      <Row style={{marginTop:30}}>
          <MovieList
            movies={filteredMovies}
            onRef={ref => (this.child = ref)}
            onSelectMovie={(movie) => this.props.onSelectMovie(movie)}
            selectedMovies={this.props.selectedMovies}
          />
      </Row>
    </div>)
  }
}

export default SearchCatalogue;
