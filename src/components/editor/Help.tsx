import React, { useState } from 'react';
import '../../styles/editor/Help.scss';

const Help = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="help">
            <button className="helpButton" onClick={() => setExpanded(!expanded)}>
                ?
            </button>
            {expanded && <div className="helpContent">
                <ol>
                    <li>
                    To look around, click, hold and drag the mouse. 
                    </li>
                    <li>
                    To move forward/backward, scroll up/down.
                    </li>
                    <li>
                    To Place an image, click the "Place" button on the top left. Then click, hold and drag anywhere in the 3D scene.  
                    </li>
                </ol>
            </div>}
        </div>
    );
};

export default Help;
