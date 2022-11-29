import React from 'react';
import '../../../styles/landingPage/ui/ScrollDownArrow.scss';
// Arrow does not scale yet

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScrollDownArrow(props: any) {
  return <div className="arrow" onClick={props.onClick}></div>;
}

export default ScrollDownArrow;
