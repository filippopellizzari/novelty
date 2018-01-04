import React from 'react';
import Search from '../components/Search'
import SelectedList from '../components/SelectedList'
import movies from '../movies.json'
import {Row, Col, Button} from 'react-bootstrap';

class Catalogue extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedMovies: [],
      selects: 0
    };
  }

  addSelect(newMovie){
    let moviesToSelect=5;
    //selected movies are limited and are not duplicated
    if(this.state.selectedMovies.indexOf(newMovie) === -1 &&
    this.state.selects < moviesToSelect){
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

    let moviesToSelect=5;

    return (
      <div className="container">
        <Row style={{marginTop: 30}}>
          <Col xs={12} md={8}>
            <Search movies={movies}
              onSelectMovie={this.addSelect.bind(this)}
            />
          </Col>
          <Col xs={6} md={4} style={{paddingLeft: 50}}>
            <SelectedList selectedMovies={this.state.selectedMovies}
              onRemove={this.removeSelect.bind(this)}
            />
            <div style={{textAlign:'center'}}>
              <Button bsStyle="primary" bsSize="large" href="/survey/1"
                hidden={this.state.selects !== moviesToSelect}>Start!
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Catalogue;
