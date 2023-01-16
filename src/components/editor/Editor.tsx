/* eslint-disable react/no-unknown-property */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import logo from '../../assets/svgs/logoBright.svg';
import '../../styles/editor/Editor.scss';
import Help from './Help';
import PlaceImage from './PlaceImage';
import Scene3D from './Scene3D';
import SceneSettings from './SceneSettings';

function Editor() {
  const [editorState, setEditorState] = useState<string>('navigate');
  // editorState can be either:
  // - 'navigate' -> looking around and moving through scene
  // - 'place'    -> actively placing an image
  // - 'edit'     -> actively editing an images position or scale (when you are dragging along the gizmo)

  const [selectedImageKey, setSelectedImageKey] = useState<string>((sessionStorage.key(0) || '').toString());

  const [lighting, setLighting] = useState<string>('noon'); // can either be 'noon', 'goldenHour' or 'midnight'

  const [POIsEnabled, setPOIsEnabled] = useState<boolean>(true);

  const [scene, setScene] = useState<string>('scene1');

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Loading Time
  }, []);

  useEffect(() => {
    if(editorState === 'place'){
        document.body.style.cursor = 'crosshair'
    } else {
        document.body.style.cursor = 'auto';
    }
  }, [editorState]);

  return (
    <div className="Editor">
      {loading ? (
        <div className="LoadingScreen">
          <BarLoader
            loading={loading}
            height={12}
            width={300}
            color={'#f88dd5'}
            speedMultiplier={0.7} // matches good with the bar loading time to get 1 full cycle through
            className="loader"
          />
          <img src={logo} className="logo-loadingscreen" />
        </div>
      ) : (
        <div className="Content">
          <div className="UItop">
            <div
              className="logo"
              onClick={() => {
                navigate('/');
              }}
            >
              <img src={logo} />
            </div>
            <PlaceImage
              selectedImageKey={selectedImageKey}
              setSelectedImageKey={setSelectedImageKey}
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <SceneSettings
              lighting={lighting}
              setLighting={setLighting}
              POIsEnabled={POIsEnabled}
              setPOIsEnabled={setPOIsEnabled}
              scene={scene}
              setScene={setScene}
            />
          </div>
          <div className="UIbottom">
            <Help />
          </div>
          {/* <div className='UIdebug'>
                --- DEBUG --- <br/><br/>
                editorState = {editorState} <br/>
                selectedImageKey = {selectedImageKey}
            </div> */}
          <Scene3D
            editorState={editorState}
            setEditorState={setEditorState}
            selectedImageKey={selectedImageKey}
            lighting={lighting}
            POIsEnabled={POIsEnabled}
            scene={scene}
          />
        </div>
      )}
    </div>
  );
}

export default Editor;
