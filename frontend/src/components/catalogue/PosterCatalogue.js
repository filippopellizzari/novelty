import React from 'react';
import { Image } from 'semantic-ui-react';

class PosterCatalogue extends React.Component {

  onClick(){
    this.props.onClick();
  }

  render(){
    const selectedIds = this.props.selectedMovies.map(
      (movie) => movie.id
    );
    var isSelected;
    for(var s in selectedIds){
      if(selectedIds[s] === this.props.id){
        isSelected=true;
      }
    }
    var opacity = isSelected ? 0.5 : 1;
    var cursor = isSelected ? "" : "pointer";

    return(
      <Image
        key={this.props.id}
        src={this.props.path}
        alt={this.props.id}
        height={this.props.height}
        width={this.props.width}
        onClick={this.onClick.bind(this)}
        style={{opacity:opacity,cursor:cursor}}
        bordered
        rounded
      />
    );
  }
}

export default PosterCatalogue;
