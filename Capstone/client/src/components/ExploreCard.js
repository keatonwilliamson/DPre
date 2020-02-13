import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'


function BankCard(props) {
    // const sidebar = useRef();
    // useEffect(() => {
    //     console.log("useEffect ran", sidebar.current.ref.current.scrollTop)
    //     sidebar.current.ref.current.scrollTop = props.sidebarScroll;
    // }, [props.sidebarLoaded]);

    return (<>
        <div style={{display: 'flex', justifyContent: 'space-around', width: 700, height: 50, border: "1px solid grey"}}>
            <p id={props.preset.id} style={{fontSize: 18}} onClick={props.pushToPresetView} >{props.preset.presetName}</p>
            <p id={props.preset.id} style={{fontSize: 18}} onClick={props.deletePreset}>DELETE</p>
        </div>
    </>
    )
}
export default BankCard