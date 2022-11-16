import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <h1>
          <span className="normal-weight">Graphic Mockups in 3D?</span>
          <br />
          We got &apos;em.
        </h1>
        <div className="description">
          <p>
            <b>How it works</b>
            <br />
            Simply upload an image of the graphic design you&apos;re currently working on and place it anywhere in an
            interactive 3D scene.
          </p>
        </div>
        <input type="file" onChange={(event) => (event.target.files ? setData(event.target.files[0]) : '')}></input>
        <button onClick={() => getData()} className="btn_upload">
          Upload Image
        </button>
      </div>
      <img id="uploadedImg" src="" alt="test preview"></img>
    </div>
  );
}

export default App;

function setData(file: File) {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    //const result: string = reader.result as string;
    sessionStorage.setItem('myImage', typeof reader.result === 'string' ? reader.result : '');
  });

  reader.readAsDataURL(file);
}

function getData() {
  const data = sessionStorage.getItem('myImage');
  if (data) {
    // console.log(data);
    document.querySelector('#uploadedImg')?.setAttribute('src', data);
  }
}
