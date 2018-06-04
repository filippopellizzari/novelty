import React from 'react';
import { Image } from 'semantic-ui-react';

class PosterSurvey extends React.Component {

  render(){

    var imageSrc = this.props.path === null
      ? null
      : "https://image.tmdb.org/t/p/w500" + this.props.path;

    return(
      <Image
        key={this.props.id}
        src={imageSrc}
        alt={this.props.title}
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
