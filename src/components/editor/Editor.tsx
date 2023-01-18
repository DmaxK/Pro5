/* eslint-disable react/no-unknown-property */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
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
  // - 'edit'     -> actively editing an images position or scale (when user is dragging along the gizmo)

  const [selectedImageKey, setSelectedImageKey] = useState<string>((sessionStorage.key(0) || '').toString());

  const [lighting, setLighting] = useState<string>('noon'); // can either be 'noon', 'goldenHour' or 'midnight'

  const [POIsEnabled, setPOIsEnabled] = useState<boolean>(true);

  // location gets the stores the states that were passed when routing to this component
  const location = useLocation();

  const [scene, setScene] = useState<string>('scene1');

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //check if a state was passed through routing -> if thats the case, set Scene to respective state
    if (location.state !== null) setScene(location.state.scene);
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
        {loading && 
          <div className="LoadingScreen">
            <img src={logo} className="logo-loadingscreen" />
            <div className='loadingContent'>
              <MoonLoader
                loading={loading}
                size={28}
                color={'#f4f4f4'}
                speedMultiplier={0.7} // matches good with the bar loading time to get 1 full cycle through
                className="loader"
              />
              <span className='text-loadingscreen'>Loading Editor</span>
            </div>
          </div>
        }
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
            setLoading={setLoading}
          />
        </div>
    </div>
  );
}

export default Editor;
