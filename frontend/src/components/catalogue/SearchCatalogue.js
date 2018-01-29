import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

import compareValues from "../../utils/compareValues";
import MovieList from './MovieList';

class SearchCatalogue extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      sortBy: 'year',
      order: 'descending',
      isLoading: false,
      value:"",
      results:"",
    };

    this.updateSort = this.updateSort.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
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

     setTimeout(() => {
       if (this.state.value.length < 1) return this.resetComponent()
       const value = _.escapeRegExp(this.state.value);
       const re = new RegExp(value, 'iy')
       /*
       **TODO exact regex match
       */
       //console.log(re);
       const isMatch = result => re.test(result.title)

       const source = this.props.movies

       this.setState({
         isLoading: false,
         results: _.filter(source, isMatch),
       })


     }, 200)

     this.child.resetComponent();
   }

  render(){

    const { isLoading, value, results } = this.state

    const sortOptions = [
      { key: 'year', value: 'year', text: 'Release Year' },
      { key: 'title', value: 'title', text: 'Title' },
      { key: 'imdb_rating', value: 'imdb_rating', text: 'IMDb Rating' }
    ]

    /*
    **TODO exact word search without bugs
    */
    /*
    let filteredMovies = value.length === 0 ? this.props.movies : results;
    let sortedMovies = this.props.movies.sort(
      compareValues(this.state.sortBy, this.state.order)
    );
    */

    let filteredMovies = this.props.movies.filter(
      (movie) => {
        return movie.title.toLowerCase()
          .indexOf(value.toLowerCase()) !== -1;
      }
    ).sort(
      compareValues(this.state.sortBy, this.state.order)
    );

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
