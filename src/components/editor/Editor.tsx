/* eslint-disable react/no-unknown-property */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/editor/Editor.scss';
import Help from './Help';
import PlaceImage from './PlaceImage';
import Scene3D from './Scene3D';
import SceneSettings from './SceneSettings';

function Editor() {
    const [editorState, setEditorState] = useState<string>('navigate') 
    // editorState can be either:
    // - 'navigate' -> looking around and moving through scene
    // - 'place'    -> actively placing an image
    // - 'edit'     -> edit and image's position or scale

    const navigate = useNavigate();
    const [selectedImageKey, setSelectedImageKey] = useState<string>((sessionStorage.key(0) || '').toString());

    return (
        <div className="Editor">
            <div className='UItop'>
                <div className="logo" onClick={() => { navigate('/') }}>
                    Logo
                </div>
                <PlaceImage selectedImageKey={selectedImageKey} setSelectedImageKey={setSelectedImageKey}/>
                <SceneSettings />
            </div>
            <div className='UIbottom'>
                <Help />
            </div>
            <div className='UIdebug'>
                --- DEBUG --- <br/><br/>
                editorState = {editorState} <br/>
                selectedImageKey = {selectedImageKey}
            </div>
            <Scene3D editorState={editorState} setEditorState={setEditorState}/>
        </div>

    );
}

export default Editor;
