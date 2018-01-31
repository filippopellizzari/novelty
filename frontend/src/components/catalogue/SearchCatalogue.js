import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { Search } from 'semantic-ui-react';
import axios from 'axios';

//import compareValues from "../../utils/compareValues";
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
       axios.get("https://api.themoviedb.org/3/search/movie?page=1"+
       "&query="+this.state.value+
       "&language=en-US&api_key=a070e12e1c6d7b84ebc1b172c841a8bf")
       .then((response) => this.setState({results:response.data.results}))
       .catch((error) => console.log(error));

       this.setState({
         isLoading: false,
       });

     }, 200)

     this.child.resetComponent();
   }

  render(){

    const { isLoading, value, results } = this.state

    const sortOptions = [
      { key: 'release_date', value: 'release_date', text: 'Release Year' },
      { key: 'title', value: 'title', text: 'Title' },
      { key: 'vote_average', value: 'vote_average', text: 'IMDb Rating' }
    ]

    /*
    let filteredMovies = this.props.movies.filter(
      (movie) => {
        return movie.title.toLowerCase()
          .indexOf(value.toLowerCase()) !== -1;
      }
    ).sort(
      compareValues(this.state.sortBy, this.state.order)
    );
    */
    console.log(results);


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
