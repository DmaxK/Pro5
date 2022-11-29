import React from 'react';
import '../../../styles/landingPage/ui/BtnEditor.scss';

interface BtnEditorProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function BtnEditor(props: BtnEditorProps) {
  return (
    <button className="btnEditor" onClick={props.onClick}>
      Editor
    </button>
  );
}

export default BtnEditor;
