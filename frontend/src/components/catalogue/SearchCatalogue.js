import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Input} from 'semantic-ui-react';
import axios from 'axios';

import admin from '../../data/admin.json';
import MovieList from './MovieList';


class SearchCatalogue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      popularMovies: [],
      searchResults: [],
      totalResults:'',
      value:'',
      mode:"default"
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    const moviesPerPage = admin.moviesPerPage;
      axios.get("api/movies/popular/1/"+moviesPerPage+"/")
      .then((res) => this.setState({
        popularMovies: res.data,
        totalResults: 80
        }));
  }

  handleSearch(e){
    if(e.key==='Enter' && e.target.value.length>0){
      const value = e.target.value
      const moviesPerPage = admin.moviesPerPage
      this.setState({isLoading: true, value:value, mode:"search"})
      setTimeout(() => {
        axios.get("api/movies/search-total-results/"+value+"/")
          .then((res) =>
          this.setState({
            totalResults: res.data
          }))
        axios.get("api/movies/search-by-title/"+value+"/1/"+moviesPerPage+"/")
          .then((res) =>
          this.setState({
            searchResults: res.data
          }))

      this.setState({isLoading: false});
    }, 500)
      this.child.resetComponent();
    }
  }

  changeMode(e){
    if (e.target.value.length < 1){
      this.setState({mode:"default", totalResults: 40})
    }
  }

  onPageChange(activePage){
    const {value, mode} = this.state
    const moviesPerPage = admin.moviesPerPage
    if(mode==="search"){
        axios.get("api/movies/search-by-title/"+value+"/"+activePage+"/"
          +moviesPerPage+"/")
          .then((res) =>
          this.setState({
            searchResults: res.data
          }))
    }
    if(mode==="default"){
      axios.get("api/movies/popular/"+activePage+"/"+moviesPerPage+"/")
        .then((res) =>
        this.setState({
          popularMovies: res.data
        }))
    }
  }


  render() {

    const {isLoading, searchResults, totalResults, popularMovies, mode} = this.state

    var movies = mode==="default" ? popularMovies : searchResults
    var title = mode==="default" ? <h2>The most popular movies</h2> : null

    return (
      <div>
        <Row>
          <Col>
            <div style={{marginLeft: 20}}>
              <Input
                icon='search'
                placeholder='Search by title'
                loading={isLoading}
                onKeyPress={this.handleSearch}
                onChange={this.changeMode}
              />
            </div>
          </Col>
          <Col>

          </Col>
        </Row>
        <Row style={{marginTop:30}}>
            <div className="container" style={{marginBottom:30}}>
              {title}
            </div>
            <MovieList
              movies={movies}
              totalResults={totalResults}
              onRef={ref => (this.child = ref)}
              onPaginationChange={this.onPageChange}
              onSelectMovie={(movie) => this.props.onSelectMovie(movie)}
              selectedMovies={this.props.selectedMovies}
            />
        </Row>
      </div>
    )}
}

export default SearchCatalogue;
