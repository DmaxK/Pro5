import React from 'react';
import { MoonLoader } from 'react-spinners';
import logo from '../../assets/svgs/logoBright.svg';

function LoadingScreen() {
    return (
        <div className="LoadingScreen">
            <img src={logo} className="logo-loadingscreen" />
            <div className='loadingContent'>
              <MoonLoader
                loading={true}
                size={28}
                color={'#f4f4f4'}
                speedMultiplier={0.7} // matches good with the bar loading time to get 1 full cycle through
                className="loader"
              />
              <span className='text-loadingscreen'>Loading Editor</span>
            </div>
          </div>
    )
}

export default LoadingScreen;