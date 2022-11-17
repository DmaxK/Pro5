import React, { useState } from 'react'
import '../../styles/editor/PlaceImage.css'

const PlaceImage = (props: any) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className='placeImage'>
            <button className='place' onClick={() => alert("Placing Image!!")}>
                Place
            </button>
            <button className='dropdown' onClick={() => setExpanded(!expanded)}>
                {expanded ? <div>&lt;</div> : <div>&gt;</div>}
            </button>
            {expanded &&
                <div className='dropdownContent'> 
                    Here are multiple images
                </div>
            }

        </div>
    )
}

export default PlaceImage