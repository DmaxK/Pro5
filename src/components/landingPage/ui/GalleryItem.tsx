import React, { useState } from 'react';
import '../../../styles/landingPage/ui/GalleryItem.scss';

interface GalleryItemProps {
  URL: string;
  gifURL: string;
  alt: string;
}

function GalleryItem(props: GalleryItemProps) {
  const [url, setUrl] = useState(props.URL);
  return (
    <img
      className="galleryItem"
      src={url}
      alt={props.alt}
      onMouseMove={() => setUrl(props.gifURL)}
      onMouseLeave={() => setUrl(props.URL)}
    />
  );
}

export default GalleryItem;
