import React from 'react';
import '../../../styles/landingPage/ui/GalleryItem.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GalleryItem(props: any) {
  return <img className="galleryItems" src={props.URL} alt={props.alt} />;
}

export default GalleryItem;
