import React from 'react';
import '../../../styles/landingPage/ui/RotatingImages.scss';
import RotatingItem from './RotatingItem';

function RotatingImages() {
  return (
    <div className="rotatingImages">
      <RotatingItem URL_Front={'./images/poster_1.jpg'} alt_Front="Poster_1" URL_Back={'./images/poster_1_bg.png'} alt_Back="Poster_1_Background" />
      <RotatingItem URL_Front={'./images/poster_2.jpg'} alt_Front="Poster_2" URL_Back={'./images/poster_2_bg.jpg'} alt_Back="Poster_2_Background" />
      {/* <RotatingItem URL={'./images/kingsrow.jpg'} alt="Kings Row" /> */}
    </div>
  );
}

export default RotatingImages;
