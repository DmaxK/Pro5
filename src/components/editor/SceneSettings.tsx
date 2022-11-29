import React, { useState } from 'react';
import '../../styles/editor/SceneSettings.scss';
import DropDownArrow from '../../assets/svgs/DropDownArrow.svg';


const SceneSettings = () => {
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
          Scene1, Scene2, Scene2 <br />
          More Settings! epic
        </div>
      )}
    </div>
  );
};

export default SceneSettings;
