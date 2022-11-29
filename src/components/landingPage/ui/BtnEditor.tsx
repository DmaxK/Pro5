import React from 'react';
import '../../../styles/landingPage/ui/BtnEditor.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BtnEditor(props: any) {
  return (
    <button className="btnEditor" onClick={props.onClick}>
      Editor
    </button>
  );
}

export default BtnEditor;
