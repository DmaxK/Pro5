import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/landingPage/ui/RotatingItem.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RotatingItem(props: any) {
  //const [mousePos, setMousePos] = useState({});
  const constrain = 20;
  const imgRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (e: any) => {
      //setMousePos({ x: e.clientX, y: e.clientY });
      const img = imgRef.current as unknown as HTMLImageElement;
      const bg = bgRef.current as unknown as HTMLImageElement;

      const xy = [e.clientX, e.clientY];
      const position = xy.concat([img]);

      window.requestAnimationFrame(function () {
        transformElement(img, position);
        transformElement(bg, position);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  function transforms(x: number, y: number, el: HTMLElement) {
    const box = el.getBoundingClientRect();
    const calcX = -(y - box.y - box.height / 2) / constrain;
    const calcY = (x - box.x - box?.width / 2) / constrain;

    return 'perspective(100px) ' + ' rotateX(' + calcX + 'deg)' + ' rotateY(' + calcY + 'deg)';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function transformElement(el: HTMLImageElement, xyEl: any) {
    // eslint-disable-next-line prefer-spread
    el.style.transform = transforms.apply(null, xyEl);
  }

  return (
    <div className="rotatingItemContainer" onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="rotatingItem" style={{ border: isHovered ? 'none' : '' }}>
        {isHovered && <img className="bg" src={props.URL} alt={props.alt} ref={bgRef} />}
        <img className="rotatingImg" src={props.URL} alt={props.alt} ref={imgRef} />
      </div>
    </div>
  );
}

export default RotatingItem;
