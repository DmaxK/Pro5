import React from 'react';
import '../../../styles/landingPage/ui/UploadButton.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UploadButton() {
  function setData(file: File) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      //const result: string = reader.result as string;
      sessionStorage.setItem('myImage', typeof reader.result === 'string' ? reader.result : '');
      getData();
    });

    reader.readAsDataURL(file);
  }

  function getData() {
    const data = sessionStorage.getItem('myImage');
    if (data) {
      // console.log(data);
      const img = document.querySelector('#uploadedImg') as HTMLElement;
      img.setAttribute('src', data);
      img.style.display = 'block';
    }
  }

  return (
    <div className="customFileUpload">
      <label htmlFor="file-upload" className="uploadButton">
        Upload Image
      </label>
      <input
        id="file-upload"
        type={'file'}
        onChange={(event) => (event.target.files ? setData(event.target.files[0]) : '')}
      />
    </div>
  );
}

export default UploadButton;
