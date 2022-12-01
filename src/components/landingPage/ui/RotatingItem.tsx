import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/landingPage/ui/RotatingItem.scss';

interface RotatingItemProps {
  URL: string;
  alt: string;
}

function RotatingItem(props: RotatingItemProps) {
  //const [mousePos, setMousePos] = useState({});
  const constrain = 20;
  const imgRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const [isHovered, setHovered] = useState(false);
  //let fadeOutTimer: number | undefined;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      //setMousePos({ x: e.clientX, y: e.clientY });
      const img = imgRef.current as HTMLImageElement;
      const bg = bgRef.current as HTMLImageElement;

      const position = [e.clientX, e.clientY];

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
    const calcY = (x - box.x - box.width / 2) / constrain;
    //console.log('x: ' + calcX);
    //console.log('y: ' + calcY);

    return 'perspective(100px) ' + ' rotateX(' + calcX + 'deg)' + ' rotateY(' + calcY + 'deg)';
  }

  function transformElement(el: HTMLImageElement, positions: number[]) {
    if (el) {
      el.style.transform = transforms(positions[0], positions[1], el);
    }
  }

  function changeClassOfImg(el: HTMLImageElement, remove: string, add: string) {
    if (el?.classList.contains(remove)) {
      el?.classList.remove(remove);
    }
    el?.classList.add(add);
  }

  return (
    <div
      className="rotatingItemContainer"
      onMouseOver={() => {
        if (bgRef.current == null) return;
        changeClassOfImg(bgRef.current, 'fadeOut', 'fadeIn');
        bgRef.current?.classList.add('bgHover');
      }}
      onMouseLeave={() => {
        if (bgRef.current == null) return;
        changeClassOfImg(bgRef.current, 'fadeIn', 'fadeOut');
        if (bgRef.current?.classList.contains('bgHover')) {
          bgRef.current?.classList.remove('bgHover');
        }
      }}
    >
      <div className="rotatingItem" style={{ border: isHovered ? 'none' : '' }}>
        <img className="bg" src={props.URL} alt={props.alt} ref={bgRef} />
        <img className="rotatingImg" src={props.URL} alt={props.alt} ref={imgRef} />
      </div>
    </div>
  );
}

export default RotatingItem;
