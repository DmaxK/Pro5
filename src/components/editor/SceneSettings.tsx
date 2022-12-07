import React, { Dispatch, SetStateAction, useState } from 'react';
import '../../styles/editor/SceneSettings.scss';
import DropDownArrow from '../../assets/svgs/DropDownArrow.svg';
import { PivotControls } from '@react-three/drei';


const SceneSettings: React.FC<{
    lighting: string,
    setLighting: Dispatch<SetStateAction<string>>,
    POIsEnabled: boolean,
    setPOIsEnabled: Dispatch<SetStateAction<boolean>>
}> = ({ lighting, setLighting, POIsEnabled, setPOIsEnabled }) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="sceneSettings">
            <button className="settingsButton" onClick={() => setExpanded(!expanded)}>
                <div className='text'>
                    Settings
                </div>
                <img className={expanded ? 'up' : 'down'} src={DropDownArrow} />
            </button>
            {expanded && (
                <div className="settingsContent">
                    <div className='section scene' >
                        <div className='title'>Scene</div>
                        <div className='scenes'>
                            <div className='thumbnail'><img className='selected' src='/images/summonersrift.jpg'></img></div>
                            <div className='thumbnail'><img src='/images/rocketleague.jpg'></img></div>
                            <div className='thumbnail'><img src='/images/kingsrow.jpg'></img></div>
                        </div>
                    </div>
                    <div className='section lighting' >
                        <div className='title'>Lighting Mode</div>
                        <div className='modes'>
                            <div className={'mode ' + (lighting === 'noon' ? 'selected' : '')} onClick={() => setLighting('noon')}>Noon</div>
                            <div className={'mode ' + (lighting === 'goldenHour' ? 'selected' : '')} onClick={() => setLighting('goldenHour')}>Golden Hour</div>
                            <div className={'mode ' + (lighting === 'midnight' ? 'selected' : '')} onClick={() => setLighting('midnight')}>Midnight</div>
                        </div>
                    </div>
                    <div className='section POI' >
                        <div className='title'>Points of Interest</div>
                        <div className='toggle' onClick={() => setPOIsEnabled(!POIsEnabled)}>
                            <div className={'outer ' + (POIsEnabled ? 'enabled' : '')}>
                                <div className='pin' />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SceneSettings;
