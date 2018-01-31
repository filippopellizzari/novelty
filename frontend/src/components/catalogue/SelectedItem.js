import React from 'react';
import { Button, Image, List, Icon } from 'semantic-ui-react'

class SelectedItem extends React.Component {
  render(){

    return(
      <List.Item>
        <Image avatar
          src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path}
        />
        <List.Content verticalAlign='middle'>
          <List.Header>
            {this.props.movie.title.substr(0,32)}
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
