/* eslint-disable react/no-unknown-property */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/editor/Editor.scss';
import Help from './Help';
import PlaceImage from './PlaceImage';
import Scene3D from './Scene3D';
import SceneSettings from './SceneSettings';
import logo from '../../assets/svgs/logoBright.svg';

function Editor() {
    const [editorState, setEditorState] = useState<string>('navigate') 
    // editorState can be either:
    // - 'navigate' -> looking around and moving through scene
    // - 'place'    -> actively placing an image
    // - 'edit'     -> actively editing an images position or scale (when you are dragging along the gizmo)

    const [selectedImageKey, setSelectedImageKey] = useState<string>((sessionStorage.key(0) || '').toString());

    const [lighting, setLighting] = useState<string>('noon') // can either be 'noon', 'goldenHour' or 'midnight'

    const [POIsEnabled, setPOIsEnabled] = useState<boolean>(true)

    const [scene, setScene] = useState<string>('scene1');

    const navigate = useNavigate();

    return (
        <div className="Editor">
            <div className='UItop'>
                <div className="logo" onClick={() => { navigate('/') }}>
                    <img src={logo} />
                </div>
                <PlaceImage selectedImageKey={selectedImageKey} setSelectedImageKey={setSelectedImageKey} setEditorState={setEditorState}/>
                <SceneSettings lighting={lighting} setLighting={setLighting} POIsEnabled={POIsEnabled} setPOIsEnabled={setPOIsEnabled} scene={scene} setScene={setScene}/>
            </div>
            <div className='UIbottom'>
                <Help />
            </div>
            {/* <div className='UIdebug'>
                --- DEBUG --- <br/><br/>
                editorState = {editorState} <br/>
                selectedImageKey = {selectedImageKey}
            </div> */}
            <Scene3D editorState={editorState} setEditorState={setEditorState} selectedImageKey={selectedImageKey} lighting={lighting} POIsEnabled={POIsEnabled} scene={scene}/>
        </div>

    );
}

export default Editor;
