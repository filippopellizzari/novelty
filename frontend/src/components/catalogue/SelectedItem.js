import React from 'react';
import { Button, Image, List, Icon } from 'semantic-ui-react'

class SelectedItem extends React.Component {
  render(){

    var imageSrc = this.props.movie.poster_path === null
      ? "https://www.movieinsider.com/images/none_175px.jpg"
      : "https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path;

    return(
      <List.Item>
        <Image avatar
          src={imageSrc}
        />
        <List.Content verticalAlign='middle'>
          <List.Header>
            {this.props.movie.title.substr(0,30)}
          </List.Header>
        </List.Content>
        <List.Content floated='right'>
          <Button icon onClick={this.props.onRemove}>
            <Icon name="remove"/>
          </Button>
        </List.Content>
      </List.Item>
    );
  }
}

export default SelectedItem;
