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
                <section>
                    <div className='title'>Move</div>
                    <div className='content'>
                        <ul>
                            <li>
                                To <span>look around</span>, click, hold and drag the mouse.
                            </li>
                            <li>
                                To <span>move forward/backward</span>, scroll up/down.
                            </li>
                        </ul>
                    </div>
                </section>

                <section>
                    <div className='title'>Images</div>
                    <div className='content'>
                        <ul>
                            <li>
                                To <span>place an image</span>, press the "Place" button on the top left. Then click anywhere in the scene.
                            </li>
                            <li>
                                To <span>scale an image</span>, select the image and move its corners.
                            </li>
                            <li>
                                to <span>move an image</span>, select the image and drag it anywhere in the scene.
                            </li>
                            <li>
                                To <span>adjust an image's appearance</span>, select the image and edit the settings next to it.
                            </li>
                        </ul>
                    </div>
                </section>

                <section>
                    <div className='title'>Other</div>
                    <div className='content'>
                        <ul>
                            <li>
                                To <span>upload more images</span>, use the "&gt;" button next to "Place" button.
                            </li>
                            <li>
                                To <span>change the scene and lighting</span>, press the "Settings" button.
                            </li>
                        </ul>
                    </div>
                </section>



            </div>}
        </div>
    );
};

export default Help;
