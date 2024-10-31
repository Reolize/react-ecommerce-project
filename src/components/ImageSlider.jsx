import React from 'react';
import Slider from 'react-slick';

import promo1 from '../assets/images/promo-1.png'; 
import promo2 from '../assets/images/promo-2.png'; 
import promo3 from '../assets/images/promo-3.png'; 

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 5000,
    appendDots: dots => (
      <div style={styles.dotsContainer}>
        <ul style={{ margin: 0 }}>{dots}</ul>
      </div>
    ),
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
    position: 'relative',
    margin: 0,  // Remove any margin
    padding: 0, // Remove any padding

  },
  image: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  dotsContainer: {
    position: 'absolute', 
    bottom: '10px', 
    left: '50%', 
    transform: 'translateX(-50%)',
    display: 'flex', 
    justifyContent: 'center',
    //gap: '5px', 
  },
  dot: {
    width: '10px', 
    height: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default ImageSlider;
