import React from 'react';
import { List } from 'semantic-ui-react'
import SelectedItem from './SelectedItem'

class SelectedList extends React.Component {

  handleRemove(movie){
    this.props.onRemove(movie);
  }

  render(){
    return(
      <div>
        <h3>My Preferences</h3>
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
