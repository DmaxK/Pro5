import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/landingPage/LandingPage.scss';
import Description from './sections/Description';
import Headline from './sections/Headline';
import BtnEditor from './ui/BtnEditor';
import SceneGallery from './ui/SceneGallery';
import ScrollDownArrow from './ui/ScrollDownArrow';
import UploadButton from './ui/UploadButton';

function LandingPage() {
  const ref = useRef<HTMLHeadingElement>(null);

  // function setData(file: File) {
  //   const reader = new FileReader();

  //   reader.addEventListener('load', () => {
  //     //const result: string = reader.result as string;
  //     sessionStorage.setItem('myImage', typeof reader.result === 'string' ? reader.result : '');
  //   });

  //   reader.readAsDataURL(file);
  // }

  // function getData() {
  //   const data = sessionStorage.getItem('myImage');
  //   if (data) {
  //     // console.log(data);
  //     document.querySelector('#uploadedImg')?.setAttribute('src', data);
  //   }
  // }

  const navigate = useNavigate();
  const routeChange = () => {
    const path = 'editor';
    navigate(path);
  };

  const handleScrollClick = () => {
    if (ref.current == null) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="content-wrapper">
      <BtnEditor onClick={routeChange} />
      <div className="content-limiter">
        <Headline />
        <Description />
        <ScrollDownArrow onClick={handleScrollClick} />
        <h2 ref={ref}>1. Upload your design</h2>
        <UploadButton />
        <img id="uploadedImg" src="" alt="test preview"></img>
        <h2>2. Select 3D scene</h2>
        <SceneGallery />
      </div>
      footer stuff
      <br />
      copyright stuff
      <br />
      <br />
      <br />
      <br />
      <br />
      bruh
    </div>
  );
}

export default LandingPage;
