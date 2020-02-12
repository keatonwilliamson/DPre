import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'


function SidebarItems(props) {
    const sidebar = useRef();
    useEffect(() => {
        console.log("useEffect ran", sidebar.current.ref.current.scrollTop)
        sidebar.current.ref.current.scrollTop = props.sidebarScroll;
    }, [props.sidebarLoaded]);

    return (<>
    <div style={{posiiton: 'fixed'}}>
    <div style={{position: 'absolute', left: 0}} onClick={props.showSidebar}>SHOW</div> 
        <Sidebar.Pushable
            style={{
                // border: '2px solid blue',
                backgroundColor: 'transparent',
                width: 300,
                height: 'calc(100vh - 62px)',
                margin: 0,
                right: 0,
                top: 0,
                posiiton: 'absolute',
                pointerEvents: (props.sidebarIsVisible ? 'auto' : 'none'),
                overflow: 'hidden'
            }}
            // as={Segment}
            >
            <Sidebar
                // ref={sidebar} onScroll={() => props.handleSidebarScroll(sidebar.current.ref.current.scrollTop)}
                onScroll={() => console.log("big sidebar")}
                
                style={{
                    width: 300,
                    backgroundColor: 'rgba(0,0,0,.57)',
                    visibility: ((props.saving) ? "hidden" : "visible"),
                    overflow: 'hidden'
                }}
                // as={Menu}
                animation='overlay'
                direction='right'
                inverted
                vertical
                visible={props.sidebarIsVisible}
            >








                <div style={{height: 50, color: 'white', backgroundColor: 'black'}} onClick={props.hideSidebar}>HIDE</div>











                <Sidebar.Pushable
            style={{
                border: 'none',
                // backgroundColor: 'white',
                width: 300,
                height: 'calc(100% - 50px)',
                margin: 0,
                right: 0,
                top: 0,
                posiiton: 'absolute'
            }}
            // as={Segment}
            >
                          
            <Sidebar
                ref={sidebar} 
                onScroll={() => props.handleSidebarScroll(sidebar.current.ref.current.scrollTop)}
                onScroll={() => console.log("littel sidebar")}
                style={{
                    width: 300,
                    backgroundColor: 'rgba(0,0,0,.57)',
                    visibility: ((props.saving) ? "hidden" : "visible")
                }}
                as={Menu}
                animation='overlay'
                direction='right'
                inverted
                vertical
                visible={true}
            >











                {(props.sidebarLoaded) ? (<>
                
                    {/* <Menu.Item as='a' header>BANK PRESETS</Menu.Item> */}
                    {props.bank.map(preset => {
                        return (
                            <Menu.Item value={preset.id} onClick={()=> props.renderPresetFromSideBar(preset)} as='a'>{preset.presetName}</Menu.Item>
                        )
                    })}
                </>
                ) : (
                        <Dimmer active>
                            <Loader
                                style={{ visibility: (props.saving ? "hidden" : "visible") }}>Loading</Loader>
                        </Dimmer>
                    )}






            </Sidebar>
        </Sidebar.Pushable>
                    
            </Sidebar>
        </Sidebar.Pushable>
        </div>
    </>
    )
}
export default SidebarItems