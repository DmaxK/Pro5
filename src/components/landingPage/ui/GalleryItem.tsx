import React from 'react';
import '../../../styles/landingPage/ui/GalleryItem.scss';

interface GalleryItemProps {
  URL: string;
  alt: string;
}

function GalleryItem(props: GalleryItemProps) {
  return <img className="galleryItems" src={props.URL} alt={props.alt} />;
}

export default GalleryItem;
