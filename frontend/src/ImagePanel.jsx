import { Container } from '@mui/material';
import MoveableHelper from 'moveable-helper';
import Image from 'mui-image';
import PropTypes from 'prop-types';
import React from 'react';
import Moveable from 'react-moveable';
import imageXhat from './assets/xhat.png';

function parseTransform() {
  return (styleStr) => {
    const translateRegex = /translate\((.*?)px, (.*?)px\)/;
    const scaleRegex = /scale\((.*?), (.*?)\)/;
    const rotateRegex = /rotate\((.*?)deg\)/;
    const translateResult = translateRegex.exec(styleStr);
    const scaleResult = scaleRegex.exec(styleStr);
    const rotateResult = rotateRegex.exec(styleStr);

    const dx = parseFloat(translateResult?.[1]);
    const dy = parseFloat(translateResult?.[2]);
    const sx = parseFloat(scaleResult?.[1]);
    const sy = parseFloat(scaleResult?.[2]);
    const r = parseFloat(rotateResult?.[1]);

    // the dx and dy are the horizontal and vertical offsets.
    // the sx and sy are the scale factors.
    // the r is the degrees of rotation.
    return {
      dx,
      dy,
      sx,
      sy,
      r,
    };
  };
}

export default function ImagePanel({
  imgUrl,
  onImgTransform,
}) {
  const [target, setTarget] = React.useState();
  const [helper] = React.useState(new MoveableHelper());

  const targetRef = React.useRef();
  React.useEffect(() => {
    // wait for mui-image to shift in
    setTimeout(() => {
      setTarget(targetRef.current);
    }, 1000);
  }, []);

  return (
    <Container
      sx={{
        display: 'grid',
        placeItems: 'center',
        gridTemplateAreas: 'inner-div',
      }}
    >
      <Container
        sx={{
          gridArea: 'inner-div',
          padding: 0,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <Image
          src={imgUrl}
          showLoading
          errorIcon={false}
          shift="right"
          fit="contain"
        />
      </Container>

      <Container sx={{
        gridArea: 'inner-div',
        padding: 0,
        userSelect: 'none',
      }}
      >
        <div ref={targetRef}>
          <Image
            src={imageXhat}
            showLoading
            errorIcon={false}
            shift="right"
            fit="contain"
          />
        </div>
        <Moveable
          target={target}
          draggable
          scalable
          rotatable
          keepRatio={false}
          onDragStart={helper.onDragStart}
          onDrag={helper.onDrag}
          onScaleStart={helper.onScaleStart}
          onScale={helper.onScale}
          onRotateStart={helper.onRotateStart}
          onRotate={helper.onRotate}
          onDragEnd={() => {
            const { style } = target;
            onImgTransform(parseTransform(style.transform));
          }}
          onScaleEnd={() => {
            const { style } = target;
            onImgTransform(parseTransform(style.transform));
          }}
          onRotateEnd={() => {
            const { style } = target;
            onImgTransform(parseTransform(style.transform));
          }}
        />
      </Container>
    </Container>
  );
}

ImagePanel.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onImgTransform: PropTypes.func.isRequired,
};
