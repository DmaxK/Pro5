import React from 'react';
import '../../../styles/landingPage/ui/UploadButton.scss';

function UploadButton() {
  function setData(file: File) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      //const result: string = reader.result as string;
      try {
        sessionStorage.setItem('myImage', typeof reader.result === 'string' ? reader.result : '');
        getData();
      }
      catch (err) {
        // console.log(err);
        // console.log(file.size);
        alert("File size exceeds the Upload Limit (About 4 MB).");
      } 
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
        accept={'image/*'}
        onChange={(event) => (event.target.files ? setData(event.target.files[0]) : '')}
      />
    </div>
  );
}

export default UploadButton;
