import React from 'react';
import '../../../styles/landingPage/ui/SceneGallery.scss';
import GalleryItem from './GalleryItem';

function SceneGallery() {
  return (
    <div className="gallery">
      <GalleryItem URL={'./images/summonersrift.jpg'} gifURL={'./images/summonersrift.gif'} alt="Summoners Rift" />
      <GalleryItem URL={'./images/rocketleague.jpg'} gifURL={'./images/summonersrift.gif'} alt="Rocket League" />
      <GalleryItem URL={'./images/kingsrow.jpg'} gifURL={'./images/summonersrift.gif'} alt="Kings Row" />
    </div>
  );
}

export default SceneGallery;
