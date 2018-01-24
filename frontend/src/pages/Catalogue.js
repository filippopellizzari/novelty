import React from 'react';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import {Button} from 'semantic-ui-react';
import SearchCatalogue from '../components/catalogue/SearchCatalogue'
import SelectedList from '../components/catalogue/SelectedList'
import admin from '../data/admin.json'

class Catalogue extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovies: [],
      selects: 0
    };
  }

  componentDidMount(){
    axios.get("/api/movies")
      .then((response) => this.setState({movies:response.data}))
      .catch((error) => console.log(error));
  }

  addSelect(newMovie){
    /*
    * selected movies are limited and are not duplicated
    */
    if(this.state.selectedMovies.indexOf(newMovie) === -1 &&
    this.state.selects < admin.moviesToSelect){
      this.setState({
        selectedMovies: [...this.state.selectedMovies, newMovie ],
        selects: this.state.selects + 1
      })
    }
  }

  removeSelect(movieToDelete){
    this.setState({
      selectedMovies: this.state.selectedMovies.filter(
        (movie) => movie !== movieToDelete
      ),
      selects: this.state.selects - 1
    })
  }

  render() {
    return (
      <div className="container">
        <Row style={{marginTop: 30}}>
          <Col xs={12} md={8}>
            <SearchCatalogue
              movies={this.state.movies}
              onSelectMovie={this.addSelect.bind(this)}
            />
          </Col>
          <Col xs={6} md={4} style={{paddingLeft: 50, marginTop:70}}>
            <SelectedList
              selectedMovies={this.state.selectedMovies}
              onRemove={this.removeSelect.bind(this)}
          />
            <div style={{textAlign:'center', marginTop:20}}>
              <Button
                primary
                href="/survey"
                hidden={this.state.selects !== admin.moviesToSelect}>Start
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Catalogue;
