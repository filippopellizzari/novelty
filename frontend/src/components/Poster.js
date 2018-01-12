import React from 'react';
//import { Image } from 'react-bootstrap';
import { Image } from 'semantic-ui-react';

class Poster extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      opacity: 1,
    }
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseOver(){
    this.setState({opacity:0.8})
  }

  onMouseLeave(){
    this.setState({opacity:1})
  }

  render(){
    return(
      <Image
        key={this.props.id}
        src={this.props.path}
        alt={this.props.id}
        height={this.props.height}
        width={this.props.width}
        onClick={this.props.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        style={{opacity:this.state.opacity}}
        bordered
        rounded
      />
    );
  }
}

export default Poster;
