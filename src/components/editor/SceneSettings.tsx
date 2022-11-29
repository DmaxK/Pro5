import React, { useState } from 'react';
import '../../styles/editor/SceneSettings.scss';

const SceneSettings = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sceneSettings">
      <button className="settingsButton" onClick={() => setExpanded(!expanded)}>
        Settings
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
