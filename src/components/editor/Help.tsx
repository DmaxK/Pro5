import React, { useState } from 'react'
import '../../styles/editor/Help.css'

const Help = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className='help'>
            <button className='helpButton' onClick={() => setExpanded(!expanded)}>
                ?
            </button>
            {expanded &&
                <div className='helpContent'>
                    To rotate the scene, press ....... epic explanation of controls
                </div>
            }
        </div>
    )
}

export default Help