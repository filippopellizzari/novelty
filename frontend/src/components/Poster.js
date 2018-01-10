import React from 'react';
import { Image } from 'react-bootstrap';

class Poster extends React.Component {

  render(){
    return(
      <Image
        key={this.props.id}
        src={this.props.path}
        alt={this.props.id}
        height={this.props.height}
        width={this.props.width}
        onClick={this.props.onClick}
        responsive
      />
    );
  }
}

export default Poster;
