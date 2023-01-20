import React, { useEffect, useRef } from 'react';
import '../../../styles/landingPage/ui/RotatingItem.scss';

interface RotatingItemProps {
  URL_Front: string;
  URL_Back: string;
  alt_Front: string;
  alt_Back: string;
}

function RotatingItem(props: RotatingItemProps) {
  const constrain = 20;
  const imgRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
      <div className="rotatingItem">
        <img className="bg" src={props.URL_Back} alt={props.alt_Back} ref={bgRef} />
        <img className="rotatingImg" src={props.URL_Front} alt={props.alt_Front} ref={imgRef} />
      </div>
    </div>
  );
}

export default RotatingItem;
