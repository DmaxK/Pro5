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
                <ul>
                    <li>
                    To look around, press ....... epic explanation of controls 
                    </li>
                    <li>
                    To move, press ..... another epic explanation 
                    </li>
                    <li>
                    To Place an image, do this and that
                    </li>
                </ul>
            </div>}
        </div>
    );
};

export default Help;
