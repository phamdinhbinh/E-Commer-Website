import React from 'react';
import "..//slider/slider.css";
import slide_1 from '../.././utils/img/SlideCard/slide-1.png'
import slide_2 from '../.././utils/img/SlideCard/slide-2.png'
import slide_3 from '../.././utils/img/SlideCard/slide-3.png'
import slide_4 from '../.././utils/img/SlideCard/slide-4.png'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='slider'>
      <div className='container'>
        <div className='slider-content '>
          <Slider {...settings}>
            <div className='slider-item'>
                <div className='slider-item-content' >
                    <h1>50% Off For Your First Shopping</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.</p>
                </div>
                <div className='slider-item-img d-flex align-items-center justify-content-center'>
                <img src = {slide_1} alt = "" />
                </div>
            </div>
            <div className='slider-item'>
            <div  className='slider-item-content'>
                    <h1>50% Off For Your First Shopping</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.</p>
                </div>
                <div className='slider-item-img d-flex align-items-center justify-content-center'>
                <img src = {slide_2} alt = "" />
                </div>
            </div>
            <div className='slider-item'>
            <div  className='slider-item-content'>
                    <h1>50% Off For Your First Shopping</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.</p>
                </div>
                <div className='slider-item-img d-flex align-items-center justify-content-center'>
                <img src = {slide_3} alt = "" />
                </div>
            </div>


            <div className='slider-item'>
                <div  className='slider-item-content'>
                    <h1 >50% Off For Your First Shopping</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.</p>
                </div>
                <div className='slider-item-img d-flex align-items-center justify-content-center' >
                <img src = {slide_4} alt = "" />
                </div>
              
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HeaderSlider