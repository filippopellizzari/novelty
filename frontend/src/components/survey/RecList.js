import React from 'react';
import Slider from 'react-slick';

import PosterSurvey from './PosterSurvey';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';


class RecList extends React.Component {

  handleSelect(movie){
  console.log(movie.title);
  }

  render() {
    var settings = {
     dots: false,
     infinite: false,
     speed: 700,
     slidesToShow: 5,
     slidesToScroll: 4,
     prevArrow: <PrevArrow/>,
     nextArrow: <NextArrow/>
    };

    let movies = this.props.recs.map(
      (movie) =>
        <div key={movie.id}>
          <a href={"https://www.themoviedb.org/movie/"+movie.id} target='_blank'>
          <PosterSurvey
            id={movie.id}
            path={movie.poster_path}
            heigth="250"
            width="150"
            onClick={this.handleSelect.bind(this)}
          />
          </a>
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
