import React from 'react';
import { Image,Button,Icon } from 'semantic-ui-react';


class PosterCatalogue extends React.Component {

  onClick() {
    this.props.onClick();
  }

  render() {
  const selectedIds = this.props.selectedMovies.map((movie) => movie.id);
  var isSelected;
  for (var s in selectedIds) {
    if (selectedIds[s] === this.props.id) {
      isSelected = true;
    }
  }
  var opacity = isSelected
    ? 0.5
    : 1;
  var cursor = isSelected
    ? ""
    : "pointer";

var imageSrc = this.props.path === null
  ? null
  : "https://image.tmdb.org/t/p/w500" + this.props.path;

    return(
      <div>
        <Image
          key={this.props.id}
          src={imageSrc}
          alt={this.props.title}
          onClick={this.onClick.bind(this)}
          style={{opacity:opacity,cursor:cursor}}
          bordered
          rounded
          />
        <Button
          style={{position: 'absolute', top: 0, left: 15, color: "#343a40"}}
          href={"https://www.themoviedb.org/movie/"+this.props.id} target='_blank'
          icon
          size="mini"
          ><Icon name='info circle'/>
        </Button>
    </div>
    );
  }
}

export default PosterCatalogue;
