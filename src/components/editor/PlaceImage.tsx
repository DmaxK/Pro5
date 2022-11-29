import React, { useState } from 'react';
import '../../styles/editor/PlaceImage.scss';
import DropDownArrow from '../../assets/svgs/DropDownArrow.svg';
import TestPosterThumbnail from '../../assets/images/testPosterThumbnail.jpg';

const PlaceImage = (props: any) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="placeImage">
            <button className="place" onClick={() => alert('Placing Image!!')}>
                <div>
                    Place
                </div>
                <img src={TestPosterThumbnail}>
                </img>
            </button>
            <button className="dropDown" >
                {expanded &&
                    <div className='images'>
                        bruh!
                    </div>
                }
                <img src={DropDownArrow} className={expanded ? 'left' : 'right'} onClick={() => setExpanded(!expanded)} />

            </button>

        </div>
    );
};

export default PlaceImage;
