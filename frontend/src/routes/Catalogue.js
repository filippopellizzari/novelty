import React from 'react';
import axios from 'axios';
import {Row, Col, Button} from 'react-bootstrap';

import Search from '../components/catalogue/Search'
import SelectedList from '../components/catalogue/SelectedList'
import survey from '../survey_between.json'

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
    axios.get(/movies/)
      .then((response) => this.setState({movies:response.data}))
      .catch((error) => console.log(error));
  }

  addSelect(newMovie){
    /*
    * selected movies are limited and are not duplicated
    */
    if(this.state.selectedMovies.indexOf(newMovie) === -1 &&
    this.state.selects < survey.moviesToSelect){
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
            <Search movies={this.state.movies}
              onSelectMovie={this.addSelect.bind(this)}
            />
          </Col>
          <Col xs={6} md={4} style={{paddingLeft: 50}}>
            <SelectedList selectedMovies={this.state.selectedMovies}
              onRemove={this.removeSelect.bind(this)}
            />
            <div style={{textAlign:'center'}}>
              <Button bsStyle="primary" bsSize="large" href="/survey/1"
                hidden={this.state.selects !== survey.moviesToSelect}>Start!
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Catalogue;
