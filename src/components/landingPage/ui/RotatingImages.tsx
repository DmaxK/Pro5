import React from 'react';
import '../../../styles/landingPage/ui/RotatingImages.scss';
import RotatingItem from './RotatingItem';

function RotatingImages() {
  return (
    <div className="rotatingImages">
      <RotatingItem URL={'/images/summonersrift.jpg'} alt="Summoners Rift" />
      <RotatingItem URL={'/images/rocketleague.jpg'} alt="Rocket League" />
      <RotatingItem URL={'/images/kingsrow.jpg'} alt="Kings Row" />
    </div>
  );
}

export default RotatingImages;
