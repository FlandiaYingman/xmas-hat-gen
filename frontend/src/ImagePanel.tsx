import {Container} from "@mui/material";
import React from "react";
import Image from 'mui-image'
import imageXmasHat from './xmas_hat.png'
import {Resizable, ResizableBox} from 'react-resizable';
import 'react-resizable/css/styles.css'
import Draggable from "react-draggable";

let _resizeHandler = Resizable.prototype.resizeHandler;
Resizable.prototype.resizeHandler = function () {
    let resultFn = _resizeHandler.apply(this, arguments);
    return function (e) {
        let result = resultFn.apply(this, arguments);
        e.stopPropagation();
        return result;
    };
};
// Still use ResizableBox later on in code

export default function ImagePanel(props) {
    if (!props.show) {
        return <Container/>
    }
    return <Container sx={{
        display: 'grid', placeItems: 'center', gridTemplateAreas: 'inner-div',
    }}>
        <Container sx={{
            gridArea: 'inner-div', padding: 0, pointerEvents: 'none',
        }}>
            <Image src={props.imageUrl} showLoading errorIcon={false} shift="right"/>
        </Container>

        <Container sx={{
            gridArea: 'inner-div', padding: 0
        }}>
            <Draggable>
                <div>
                    <ResizableBox width={756} height={756} m
                                  lockAspectRatio={true}
                                  minConstraints={[-Infinity, -Infinity]}
                    >
                        <Image draggable="false" src={imageXmasHat} showLoading errorIcon={false} shift="right"
                               fit={'contain'}/>
                    </ResizableBox>
                </div>
            </Draggable>
        </Container>
    </Container>
}