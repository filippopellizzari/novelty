import React from 'react';
import SelectedItem from './SelectedItem'
import {Table} from 'react-bootstrap';

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
