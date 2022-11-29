/* eslint-disable react/no-unknown-property */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/editor/Editor.scss';
import Help from './Help';
import PlaceImage from './PlaceImage';
import Scene3D from './Scene3D';
import SceneSettings from './SceneSettings';

function Editor() {
  const navigate = useNavigate();

  return (
    <div className="Editor">
      <div className="UI">
        <div
          className="logo"
          onClick={() => {
            navigate('/');
            console.log('bruh');
          }}
        >
          Logo
        </div>
        <PlaceImage />
        <SceneSettings />
        <Help />
      </div>
      <Scene3D />
    </div>
  );
}

export default Editor;
