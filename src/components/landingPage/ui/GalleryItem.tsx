import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/landingPage/ui/GalleryItem.scss';

interface GalleryItemProps {
  id: number;
  URL: string;
  gifURL: string;
  alt: string;
}

function GalleryItem(props: GalleryItemProps) {
  const [url, setUrl] = useState(props.URL);
  const navigate = useNavigate();
  return (
    <img
      className="galleryItem"
      src={url}
      alt={props.alt}
      onMouseMove={() => setUrl(props.gifURL)}
      onMouseLeave={() => setUrl(props.URL)}
      onClick={() => {
        navigate('/editor', {state: {scene:"scene"+props.id}});
      }}
    />
  );
}

export default GalleryItem;
