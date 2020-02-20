import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'


function InputJack(props) {

    return (<>
        <div style={{ position: 'absolute', top: 440, left: 2323 }} >
            <img style={{ position: 'absolute', height: 66 }} src={require('../Assets/metal-circle-transparent.png')} alt="img" />
            <div style={{ position: 'absolute', backgroundColor: 'black', borderRadius: '50%', height: 45, width: 45, top: 11, left: 17  }}></div>
            <img style={{ position: 'absolute', height: 51, top: 6, left: 16 }} src={require('../Assets/transparent-hex.png')} alt="img" />
            <img style={{ position: 'absolute', height: 65, top: -1, left: 9, filter: 'drop-shadow(-2px 3px 3px black)', transform: 'rotate(-10deg)' }} src={require('../Assets/transparent-hex.png')} alt="img" />
        </div>
    </>
    )
}
export default InputJack