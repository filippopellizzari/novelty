import React from 'react';
import {Table} from 'react-bootstrap';

import SelectedItem from './SelectedItem'

class SelectedList extends React.Component {

  handleRemove(movie){
    this.props.onRemove(movie);
  }

  render(){
    return(
      <div>
        <h4>Selected Movies</h4>
        <Table>
          <tbody>
            {this.props.selectedMovies.map(
                (movie) =>
                <SelectedItem key={movie.id}
                  onRemove={this.handleRemove.bind(this, movie)}
                  movie={movie}
                />
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SelectedList;
