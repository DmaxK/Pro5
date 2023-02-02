import React, { Dispatch, useEffect, useState } from 'react';
import DropDownArrow from '../../assets/svgs/DropDownArrow.svg';
import '../../styles/editor/PlaceImage.scss';
// import Plus from '../../assets/svgs/Plus.svg';
import { getStaticContextFromError } from '@remix-run/router';
import TestPosterThumbnail from '../../assets/images/testPosterThumbnail.jpg';

const PlaceImage: React.FC<{
    selectedImageKey: string,
    setSelectedImageKey: Dispatch<React.SetStateAction<string>>,
    editorState: string,
    setEditorState: Dispatch<React.SetStateAction<string>>
}> = ({ selectedImageKey, setSelectedImageKey, editorState, setEditorState }) => {
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

        reader.addEventListener('load', () => {
            sessionStorage.setItem(file.name, typeof reader.result === 'string' ? reader.result : '');
            setSelectedImageKey(file.name)
            updateKeys();
        });
        reader.readAsDataURL(file);        
    }


    function updateKeys() {
        const temp = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            temp.push((sessionStorage.key(i) || ''));
        }
        setKeys(temp);
    }

    return (
        <div className="placeImage" >
            <button className={(keys.length === 0 ? 'noImages ' : 'images ') + (editorState === 'place' ? 'activelyPlacing' : ' ') + " place"} >
                <div onClick={() => keys.length > 0 ? setEditorState('place') : alert('Please upload an Image first.')}>
                    Place
                </div>
                {keys.length > 0 ?
                    <div className='imageContainer' onClick={() => keys.length > 0 ? setEditorState('place') : alert('Please upload an Image first.')}>
                        {
                            getImage(selectedImageKey) !== '' &&
                            <img src={getImage(selectedImageKey)} />
                        }
                    </div>
                    :
                    <>
                        <label htmlFor="file-upload-editor" >
                            <img src={'./images/Plus.svg'} className='plus' />
                        </label>
                        <input id='file-upload-editor' type={'file'} accept={'image/*'} onChange={(event) => (event.target.files ? setData(event.target.files[0]) : console.log(event))} />
                    </>
                }
            </button>
            {keys.length > 0 &&
                <button className="dropDown" >
                    <div className='dropDownContainer' onClick={() => setExpanded(!expanded)}>

                        <img src={DropDownArrow} className={expanded ? 'left' : 'right'}  />

                    </div>
                    {expanded &&
                        <>
                            <div className='images'>
                                {
                                    keys.map((key, item) =>
                                        <div
                                            key={key}
                                            onClick={() => {
                                                setSelectedImageKey(key);
                                                setExpanded(!expanded)
                                            }}
                                            className={'imageContainer ' + (key == selectedImageKey ? 'selected' : '')} >
                                            <img key={key} src={getImage(key)}></img>
                                        </div>
                                    )
                                }
                            </div>
                            <label htmlFor="file-upload-editor">
                                <img src={'./images/Plus.svg'} className='plus' />
                            </label>
                            <input id='file-upload-editor' type={'file'} accept={'image/*'} onChange={(event) => (event.target.files ? setData(event.target.files[0]) : console.log(event))} />
                        </>
                    }

                </button>
            }
        </div >
    );
};

export default PlaceImage;
