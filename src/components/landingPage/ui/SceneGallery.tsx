import React from 'react';
import '../../../styles/landingPage/ui/SceneGallery.scss';
import GalleryItem from './GalleryItem';

function SceneGallery() {
  return (
    <div className="gallery">
      <GalleryItem id={1} URL={'./images/scene_1_thumbnail.png'} gifURL={'./gifs/scene_1_image_gallery.gif'} alt="Scene_1_Thumbnail" />
      <GalleryItem id={2} URL={'./images/scene_2_thumbnail.png'} gifURL={'./gifs/summonersrift.gif'} alt="Scene_2_Thumbnail" />
      {/* <GalleryItem URL={'./images/kingsrow.jpg'} gifURL={'./images/summonersrift.gif'} alt="Kings Row" /> */}
    </div>
  );
}

export default SceneGallery;
