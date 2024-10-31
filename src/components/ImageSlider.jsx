import React from 'react';
import Slider from 'react-slick';

import promo1 from '../assets/images/promo-1.png'; // Import the image
import promo2 from '../assets/images/promo-2.png'; // Import other images as needed
import promo3 from '../assets/images/promo-3.png'; // Import other images as needed

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    { src: promo1, alt: 'Promotion 1' },
    { src: promo2, alt: 'Promotion 2' },
    { src: promo3, alt: 'Promotion 3' },
  ];

  return (
    <div style={styles.slider}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} style={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const styles = {
  slider: {
    width: '100%',
  },
  image: {
    width: '100%', // Ensure the image fills the slider
    height: '400px', // Maintain aspect ratio
  },
};

export default ImageSlider;
