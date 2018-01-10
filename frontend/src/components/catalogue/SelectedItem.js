import React from 'react';
import {Button} from 'react-bootstrap';

class SelectedItem extends React.Component {
  render(){
    return(
      <tr>
        <td>{this.props.movie.title}</td>
        <td>
          <Button bsStyle="link" onClick={this.props.onRemove}>Remove</Button>
        </td>
      </tr>
    );
  }
}

export default SelectedItem;
