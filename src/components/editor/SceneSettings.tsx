import React, { Dispatch, SetStateAction, useState } from 'react';
import '../../styles/editor/SceneSettings.scss';
import DropDownArrow from '../../assets/svgs/DropDownArrow.svg';
import noon from '../../assets/svgs/noon.svg';
import goldenHour from '../../assets/svgs/goldenHour.svg';
import midnight from '../../assets/svgs/midnight.svg';
import { PivotControls } from '@react-three/drei';


const SceneSettings: React.FC<{
    lighting: string,
    setLighting: Dispatch<SetStateAction<string>>,
    POIsEnabled: boolean,
    setPOIsEnabled: Dispatch<SetStateAction<boolean>>,
    scene: string,
    setScene: Dispatch<SetStateAction<string>>
}> = ({ lighting, setLighting, POIsEnabled, setPOIsEnabled, scene, setScene }) => {
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
                            <div className='thumbnail'><img className={scene === 'scene1' ? 'selected' : ''} src='/images/summonersrift.jpg' onClick={() => setScene('scene1')}></img></div>
                            <div className='thumbnail'><img className={scene === 'scene2' ? 'selected' : ''} src='/images/rocketleague.jpg' onClick={() => setScene('scene2')}></img></div>
                            <div className='thumbnail'><img className={scene === 'scene3' ? 'selected' : ''} src='/images/kingsrow.jpg' onClick={() => setScene('scene3')}></img></div>
                        </div>
                    </div>
                    <div className='section lighting' >
                        <div className='title'>Lighting Mode</div>
                        <div className='modes'>
                            <div className={'mode ' + (lighting === 'noon' ? 'selected' : '')} onClick={() => setLighting('noon')}>

                                <img className='lightingIcon' src={noon} />

                            </div>
                            <div className={'mode ' + (lighting === 'goldenHour' ? 'selected' : '')} onClick={() => setLighting('goldenHour')}>

                                <img className='lightingIcon' src={goldenHour} />

                            </div>
                            <div className={'mode ' + (lighting === 'midnight' ? 'selected' : '')} onClick={() => setLighting('midnight')}>

                                <img className='lightingIcon' src={midnight} />

                            </div>
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
