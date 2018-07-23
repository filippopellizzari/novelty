import React from 'react';
import { Image,Header } from 'semantic-ui-react';

class PosterSurvey extends React.Component {

  render(){

    var imageSrc = this.props.path === null
      ? "https://www.movieinsider.com/images/none_175px.jpg"
      : "https://image.tmdb.org/t/p/w500" + this.props.path;

    var movieTitle = this.props.path === null
      ?(<Header
        style={{position: 'relative', top: -200, left: 5, right:-30}}
        size='small'>
        {this.props.title}
      </Header>)
      : null

    return(

    <div>
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
      {movieTitle}
    </div>

    );
  }
}

export default PosterSurvey;
