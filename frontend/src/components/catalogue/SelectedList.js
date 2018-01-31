import React from 'react';
import { List } from 'semantic-ui-react'
import SelectedItem from './SelectedItem'

class SelectedList extends React.Component {

  handleRemove(movie){
    this.props.onRemove(movie);
  }

  render(){
    const totNumber = this.props.moviesToSelect;
    const selects = this.props.selects;

    var info = selects < totNumber ?
    <h3>Select {totNumber-selects} movies that you like</h3> :
    <h3>My preferences</h3>

    return(
      <div>
        {info}
        <List celled>
          {this.props.selectedMovies.map(
              (movie) =>
              <SelectedItem
                key={movie.id}
                onRemove={this.handleRemove.bind(this, movie)}
                movie={movie}
              />
          )}
        </List>
      </div>
    );
  }
}

export default SelectedList;
