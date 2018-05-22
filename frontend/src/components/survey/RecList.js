import React from 'react';
import Slider from 'react-slick';
import { Popup, Button } from 'semantic-ui-react'
import {Row} from 'react-bootstrap';
import axios from 'axios';

import PosterSurvey from './PosterSurvey';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';


class RecList extends React.Component {

    constructor(){
      super();
      this.state = {
        trailer_key:"",
        isTrailer:false,
      };
    }


    handleSelect(movie){
      axios.get("http://api.themoviedb.org/3/movie/"+movie.id+"/videos?"+
            "api_key=a070e12e1c6d7b84ebc1b172c841a8bf")
        .then ((res) => {
          if (res.data.results.length > 0){
            this.setState({trailer_key:res.data.results[0].key, isTrailer:true})
          }else{
            this.setState({trailer_key:"", isTrailer:false})
          }
        });
    }

    render() {
      var settings = {
       dots: false,
       infinite: false,
       speed: 700,
       slidesToShow: 4,
       slidesToScroll: 4,
       prevArrow: <PrevArrow/>,
       nextArrow: <NextArrow/>
      };

      const style = {
        borderRadius: 0,
        opacity: 1,
        padding: '2em',
        backgroundColor:"#72797d",
      }

      const { isTrailer, trailer_key } = this.state

      var trailerBotton = isTrailer
      ? <Button href={"https://www.youtube.com/watch?v="+ trailer_key} target="_blank">
          Watch Trailer
        </Button>
      : <Button disabled>No trailer found</Button>

      let movies = this.props.recs.map(
        (movie) =>
        <div key={movie.id}>
          <Popup
            key={movie.id}
            trigger = {<PosterSurvey
                        id={movie.id}
                        path={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                        heigth="250"
                        width="150"
                        />}
            position = 'left center'
            inverted
            onOpen = {this.handleSelect.bind(this,movie)}
            style = {style}
          >
            <Popup.Header style={{textAlign:'center', marginTop:10}}>{movie.title}</Popup.Header>
            <Popup.Content>
              <div className="container">
                <div style={{textAlign:'center', marginTop:10}}>
                  {movie.release_date.substring(0,4)}
                </div>
                <div style={{textAlign:'center', marginTop:10}}>
                  <Row>{movie.overview}</Row>
                </div>
                <div style={{textAlign:'center', marginTop:20}}>
                  {trailerBotton}
                </div>
              </div>
            </Popup.Content>
          </Popup>
        </div>
      );
      return (
      <div>
        <h3>List {this.props.name}</h3>
        <Slider {...settings}>
          {movies}
        </Slider>
      </div>
      );
    }
}

export default RecList;
