import React from 'react';
import { Image } from 'semantic-ui-react';

class PosterCatalogue extends React.Component {

  constructor(props) {
    super(props);
    this.state = { imageStatus: "loading" };
  }

  onClick() {
    this.props.onClick();
  }

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
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
    ? "https://www.movieinsider.com/images/none_175px.jpg"
    : "https://image.tmdb.org/t/p/w500" + this.props.path;

    return(
      <Image
        key={this.props.id}
        src={imageSrc}
        alt={this.props.id}
        onClick={this.onClick.bind(this)}
        style={{opacity:opacity,cursor:cursor}}
        onLoad={this.handleImageLoaded.bind(this)}
        bordered
        rounded
      />
    );
  }
}

export default PosterCatalogue;
