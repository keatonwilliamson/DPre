import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'


function ExploreCard(props) {
    // const sidebar = useRef();
    // useEffect(() => {
    //     console.log("useEffect ran", sidebar.current.ref.current.scrollTop)
    //     sidebar.current.ref.current.scrollTop = props.sidebarScroll;
    // }, [props.sidebarLoaded]);

    return (<>
        <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', height: 50, border: "1px solid grey"}}>
            <p id={props.preset.id} style={{fontSize: 18}} onClick={props.pushToPresetView} >{props.preset.presetName}</p>
            <p style={{fontSize: 18}}> by: {props.preset.userName}</p>
        </div>
    </>
    )
}
export default ExploreCard