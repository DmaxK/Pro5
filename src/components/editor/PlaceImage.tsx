import React, { useState } from 'react';
import '../../styles/editor/PlaceImage.scss';
import DropDownArrow from '../../assets/svgs/DropDownArrow.svg';
import Plus from '../../assets/svgs/Plus.svg';
import TestPosterThumbnail from '../../assets/images/testPosterThumbnail.jpg';
import { getStaticContextFromError } from '@remix-run/router';

const PlaceImage: React.FC<{ selectedImageKey: string }> = ({ selectedImageKey }) => {
    const [expanded, setExpanded] = useState(false);

    function getImage(image: string): string {
        // gets an image from the session storage and prepares it to be put into a img src attribute
        const data = sessionStorage.getItem(image);
        return data ? data : '';
    }

    const keys: Array<string> = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        keys.push((sessionStorage.key(i) || ''));
    }

    function setData(file: File) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            sessionStorage.setItem(file.name, typeof reader.result === 'string' ? reader.result : '');
        });
        reader.readAsDataURL(file);
    }

    sessionStorage.clear();
    console.log(sessionStorage.length)

    return (
        <div className="placeImage">
            <button className="place" onClick={() => alert('Placing Image!!')}>
                <div>
                    Place
                </div>
                {
                    getImage(selectedImageKey) !== '' &&
                    <img src={getImage(selectedImageKey)} />
                }

            </button>
            <button className="dropDown" >
                {expanded &&
                    <>
                        <div className='images'>
                            {
                                keys.map((key, item) =>
                                    <div key={key} className={'imageContainer ' + (key == selectedImageKey ? 'selected' : '')} >
                                        <img key={key} src={getImage(key)}></img>
                                    </div>
                                )
                            }
                        </div>
                        <label htmlFor="file-upload-editor">
                            <img src={Plus} className='plus' />
                        </label>
                        <input id='file-upload-editor' type={'file'} onChange={(event) => (event.target.files ? setData(event.target.files[0]) : '')} />
                    </>
                }
                <img src={DropDownArrow} className={expanded ? 'left' : 'right'} onClick={() => setExpanded(!expanded)} />
            </button>
        </div >
    );
};

export default PlaceImage;
