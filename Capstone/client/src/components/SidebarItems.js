import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'


function SidebarItems(props) {
    const sidebar = useRef();
    useEffect(() => {
        console.log("useEffect ran", sidebar.current.ref.current.scrollTop)
        sidebar.current.ref.current.scrollTop = props.sidebarScroll;
    }, [props.sidebarLoaded]);

    const scrollMe = () => {
        sidebar.current.ref.current.scrollTop = 300
    }

    return (<>
        <Sidebar.Pushable
            style={{
                border: 'none',
                backgroundColor: 'transparent',
                width: 300,
                margin: 0
            }}
            as={Segment}>
            <Sidebar
                ref={sidebar} onScroll={() => props.handleSidebarScroll(sidebar.current.ref.current.scrollTop)}
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
                    <Menu.Item as='a' onClick={scrollMe} header>YOUR BANK</Menu.Item>
                    {props.bank.map(preset => {
                        return (
                            <Menu.Item as='a'>{preset.presetName}</Menu.Item>
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
    </>
    )
}
export default SidebarItems