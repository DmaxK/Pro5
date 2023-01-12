import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/svgs/logoBright.svg';
import '../../styles/landingPage/LandingPage.scss';
import Description from './sections/Description';
import Footer from './sections/Footer';
import Headline from './sections/Headline';
import BtnEditor from './ui/BtnEditor';
import RotatingImages from './ui/RotatingImages';
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
      <img
        src={logo}
        id="logo-lp"
        onClick={() => {
          navigate('/');
        }}
      />
      <div className="content-limiter">
        <Headline />
        <Description />
        <RotatingImages />
        <ScrollDownArrow onClick={handleScrollClick} />
        <h2 ref={ref}>1. Upload your design</h2>
        <UploadButton />
        <img id="uploadedImg" src="" alt="uploaded image preview"></img>
        <h2>2. Select 3D scene</h2>
        <SceneGallery />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
