import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Input} from 'semantic-ui-react';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

import admin from '../../data/admin.json';
import MovieList from './MovieList';


class SearchCatalogue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:false,
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
    this.setState({loading:true})
      axios.get("api/movies/popular/1/"+moviesPerPage+"/")
      .then((res) => this.setState({
        popularMovies: res.data,
        totalResults: 80,
        loading:false
        }));
  }

  handleSearch(e){
    if(e.key==='Enter' && e.target.value.length>0){
      const value = e.target.value
      const moviesPerPage = admin.moviesPerPage
      this.setState({isLoading: true, value:value})
      var escapedValue = value.replace(/[^\w\s]/gi, ' ')
      setTimeout(() => {
        this.setState({loading: true})
        axios.get("api/movies/search-total-results/"+escapedValue+"/")
          .then((res) =>
          this.setState({
            totalResults: res.data
          }))
        axios.get("api/movies/search-by-title/"+ escapedValue+"/1/"+moviesPerPage+"/")
          .then((res) =>
          this.setState({
            searchResults: res.data,
            mode:"search",
            loading:false,
          }))

      //this.setState({isLoading: false});
    }, 500)
      this.child.resetComponent();
    }
  }

  changeMode(e){
    if (e.target.value.length < 1){
      const moviesPerPage = admin.moviesPerPage;
      this.setState({loading:true})
      axios.get("api/movies/popular/1/"+moviesPerPage+"/")
        .then((res) =>
        this.setState({
          popularMovies: res.data,
          totalResults: 40,
          value:'',
          mode:"default",
          loading:false,
        })
      )
    }
  }

  onPageChange(activePage){
    const {value, mode} = this.state
    const moviesPerPage = admin.moviesPerPage
    var escapedValue = value.replace(/[^\w\s]/gi, ' ')
    if(mode==="search"){
        axios.get("api/movies/search-by-title/"+ escapedValue +"/"+activePage+"/"
          +moviesPerPage+"/")
          .then((res) =>
          this.setState({
            searchResults: res.data,
            loading: false
          }))
    }
    if(mode==="default"){
      axios.get("api/movies/popular/"+activePage+"/"+moviesPerPage+"/")
        .then((res) =>
        this.setState({
          popularMovies: res.data,
          loading:false
        }))
    }
  }


  render() {

    const {loading, searchResults, totalResults, popularMovies, mode} = this.state

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
                onKeyPress={this.handleSearch}
                onChange={this.changeMode}
              />
            </div>
          </Col>
          <Col>

          </Col>
        </Row>
        <Row style={{marginTop:30}}>
            {loading ? (
            <div className='container' style={{marginLeft:330, marginTop:270}}>
                <BounceLoader
                  color={'#2c85d0'}
                  loading={loading}
                />
            </div>):(
            <div>
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
            </div>
            )}
        </Row>
      </div>
    )}
}

export default SearchCatalogue;
