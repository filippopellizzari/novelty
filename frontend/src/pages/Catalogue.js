import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Row, Col} from 'react-bootstrap';
import {Button} from 'semantic-ui-react';
import SearchCatalogue from '../components/catalogue/SearchCatalogue'
import SelectedList from '../components/catalogue/SelectedList'
import admin from '../data/admin.json'

class Catalogue extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedMovies: [],
      selects: 0
    };
  }

  componentDidMount(){
    document.title = "Catalogue"
    if(localStorage.survey !== undefined){
      this.props.history.push("/survey")
    }
    localStorage.removeItem('recs_status');
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
    localStorage.setItem("selected", JSON.stringify(this.state.selectedMovies.map(
      (movie) => movie.id
    )));
    return (
      <div className="container">
        <Row style={{marginTop: 30}}>
          <Col xs={12} md={8}>
            <SearchCatalogue
              onSelectMovie={this.addSelect.bind(this)}
              selectedMovies={this.state.selectedMovies}
            />
          </Col>
          <Col xs={6} md={4} style={{paddingLeft: 50, marginTop:70}}>
            <SelectedList
              selectedMovies={this.state.selectedMovies}
              selects={this.state.selects}
              moviesToSelect={admin.moviesToSelect}
              onRemove={this.removeSelect.bind(this)}
          />
            <div style={{textAlign:'center', marginTop:20}}>
              <Button
                primary
                href="/survey"

                hidden={this.state.selects !== admin.moviesToSelect}>Next
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Catalogue.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default connect(null)(Catalogue);
