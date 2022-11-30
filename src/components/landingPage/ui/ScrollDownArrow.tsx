import React from 'react';
import '../../../styles/landingPage/ui/ScrollDownArrow.scss';
// Arrow does not scale yet

interface ScrollDownArrowProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function ScrollDownArrow(props: ScrollDownArrowProps) {
  return (
    <div className="arrowHitbox" onClick={props.onClick}>
      <div className="arrow" />
    </div>
  );
}

export default ScrollDownArrow;
