import React from 'react';
import '../../../styles/landingPage/ui/SceneGallery.scss';
import GalleryItem from './GalleryItem';

function SceneGallery() {
  return (
    <div className="gallery">
      <GalleryItem URL={'/images/summonersrift.jpg'} alt="Summoners Rift" />
      <GalleryItem URL={'/images/rocketleague.jpg'} alt="Rocket League" />
      <GalleryItem URL={'/images/kingsrow.jpg'} alt="Kings Row" />
    </div>
  );
}

export default SceneGallery;
