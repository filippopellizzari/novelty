import React from 'react';
import Slider from 'react-slick';
import Poster from '../Poster';
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
       slidesToShow: 4,
       slidesToScroll: 4,
       prevArrow: <PrevArrow/>,
       nextArrow: <NextArrow/>
      };

      let movies = this.props.recs.map(
        (movie) =>
          <div key={movie.id}>
            <Poster
              id={movie.id}
              path={movie.poster}
              heigth="250"
              width="150"
              onClick={this.handleSelect.bind(this)}
            />
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
