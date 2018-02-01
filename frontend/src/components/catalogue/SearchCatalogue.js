import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { Search } from 'semantic-ui-react';
import axios from 'axios';

import compareValues from "../../utils/compareValues";
import admin from '../../data/admin.json';
import MovieList from './MovieList';

class SearchCatalogue extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      sortBy: 'year',
      order: 'descending',
      isLoading: false,
      value:"",
      defaultMovies:[],
      results:[],
      partialResults:[],
      totalPages:1,
    };

    this.updateSort = this.updateSort.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }

  componentDidMount(){
    for(var page=2; page<20; page++){
      axios.get("https://api.themoviedb.org/3/movie/popular?page="+page+
      "&language=en-US&api_key="+admin.tmdb_key)
      .then((response) => this.setState({
        defaultMovies: [...this.state.defaultMovies, response.data.results ],
        totalPages:response.data.total_pages
      }));
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  updateSort(e, data){
    this.setState({sortBy: data.value});
    this.child.resetComponent();
  }

  updateOrder(){
    var order = (this.state.order === 'descending') ? 'ascending' : 'descending'
    this.setState({order: order})
    this.child.resetComponent();
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: '' })
  }

  handleResultSelect = (e, { result }) => {
     this.setState({ value: result.title })
   }

   handleSearchChange = (e, { value }) => {
      this.setState({ isLoading: true, value })
      this.setState({partialResults:[]})
      setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
      for(var page=2; page<20; page++){
        axios.get("https://api.themoviedb.org/3/search/movie?include_adult=false"+
        "&page="+page+"&query="+this.state.value+
        "&language=en-US&api_key="+admin.tmdb_key)
        .then((response) => this.setState({
          partialResults: [...this.state.partialResults, response.data.results ],
          totalPages:response.data.total_pages
        }));
      }
      this.setState({results:this.state.partialResults});

      this.setState({isLoading: false});

      }, 200)

      this.child.resetComponent();
   }

  render(){

    const { isLoading, value, defaultMovies, results, totalPages } = this.state

    const sortOptions = [
      { key: 'release_date', value: 'release_date', text: 'Release Year' },
      { key: 'title', value: 'title', text: 'Title' },
      { key: 'vote_average', value: 'vote_average', text: 'Vote Average' }
    ]

    console.log(totalPages)
    if (totalPages > 20){
      this.setState({totalPages:20});
    }
    const movieList = [].concat.apply([], defaultMovies);
    const filteredMovies = movieList.sort(
      compareValues(this.state.sortBy, this.state.order)
    );

    console.log(filteredMovies)

    return(
      <div>
        <Row>
          <Col>
            <div style={{marginLeft:20}}>
              <Search
                open={false}
                placeholder="Search"
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
              />
            </div>
          </Col>
          <Col>
            <div className="sortBy" style={{marginLeft:20}}>
              <Dropdown
                onChange={this.updateSort}
                placeholder='Sort by'
                selection
                options={sortOptions}
              />
            </div>
          </Col>
          <Col>
            <div className="orderButton" style={{marginLeft:20}}>
              <Button
                icon
                onClick={this.updateOrder}
                >
                <Icon name={"sort content "+this.state.order} />
              </Button>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop:30}}>
          <MovieList
            movies={filteredMovies}
            totalPages={totalPages}
            onRef={ref => (this.child = ref)}
            onSelectMovie={ (movie) => this.props.onSelectMovie(movie) }
            selectedMovies={this.props.selectedMovies}
          />
        </Row>
      </div>

    )
  }
}

export default SearchCatalogue;
