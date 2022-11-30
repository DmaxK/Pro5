import React, { Dispatch, useEffect, useState } from 'react';
import '../../styles/editor/PlaceImage.scss';
import DropDownArrow from '../../assets/svgs/DropDownArrow.svg';
// import Plus from '../../assets/svgs/Plus.svg';
import TestPosterThumbnail from '../../assets/images/testPosterThumbnail.jpg';
import { getStaticContextFromError } from '@remix-run/router';

const PlaceImage: React.FC<{ selectedImageKey: string, setSelectedImageKey: Dispatch<React.SetStateAction<string>> }> = ({ selectedImageKey, setSelectedImageKey }) => {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [keys, setKeys] = useState<Array<string>>([])

    useEffect(() => {
        updateKeys();
    }, [])

    function getImage(image: string): string {
        // gets an image from the session storage and prepares it to be put into a img src attribute
        const data = sessionStorage.getItem(image);
        return data ? data : '';
    }

    function setData(file: File) {
        const reader = new FileReader();

        setSelectedImageKey(file.name)

        reader.addEventListener('load', () => {
            sessionStorage.setItem(file.name, typeof reader.result === 'string' ? reader.result : '');
            updateKeys();
        });
        reader.readAsDataURL(file);
    }


    function updateKeys() {
        let temp = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            temp.push((sessionStorage.key(i) || ''));
        }
        setKeys(temp);
    }

    // sessionStorage.clear();
    return (
        <div className="placeImage" >
            <button className={(keys.length === 0 ? 'noImages' : 'images') + " place"} >
                <div onClick={() => keys.length > 0 ? alert('Placing Image!!') : alert('Please upload an Image first.')}>
                    Place
                </div>
                {keys.length > 0 ?
                    <div className='imageContainer' onClick={() => keys.length > 0 ? alert('Placing Image!!') : alert('Please upload an Image first.')}>
                        {
                            getImage(selectedImageKey) !== '' &&
                            <img src={getImage(selectedImageKey)} />
                        }
                    </div>
                    :
                    <>
                        <label htmlFor="file-upload-editor" >
                            <img src={'/images/Plus.svg'} className='plus' />
                        </label>
                        <input id='file-upload-editor' type={'file'} onChange={(event) => (event.target.files ? setData(event.target.files[0]) : console.log(event))} />
                    </>
                }
            </button>
            {keys.length > 0 &&
                <button className="dropDown" >
                    <div className='dropDownContainer'>
                        <img src={DropDownArrow} className={expanded ? 'left' : 'right'} onClick={() => setExpanded(!expanded)} />
                    </div>
                    {expanded &&
                        <>
                            <div className='images'>
                                {
                                    keys.map((key, item) =>
                                        <div
                                            key={key}
                                            onClick={() => { setSelectedImageKey(key); setExpanded(!expanded) }}
                                            className={'imageContainer ' + (key == selectedImageKey ? 'selected' : '')} >
                                            <img key={key} src={getImage(key)}></img>
                                        </div>
                                    )
                                }
                            </div>
                            <label htmlFor="file-upload-editor">
                                <img src={'/images/Plus.svg'} className='plus' />
                            </label>
                            <input id='file-upload-editor' type={'file'} onChange={(event) => (event.target.files ? setData(event.target.files[0]) : console.log(event))} />
                        </>
                    }

                </button>
            }
        </div >
    );
};

export default PlaceImage;
