import React from 'react';
import { Image } from 'semantic-ui-react';

class PosterSurvey extends React.Component {

  render(){
    return(
      <Image
        key={this.props.id}
        src={this.props.path}
        alt={this.props.id}
        height={this.props.height}
        width={this.props.width}
        onClick={this.props.onClick}
        style={{cursor:"pointer"}}
        bordered
        rounded
      />
    );
  }
}

export default PosterSurvey;
