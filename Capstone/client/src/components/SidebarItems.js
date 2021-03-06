import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Input, Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'


function SidebarItems(props) {


    const [queryString, setQueryString] = useState("");


    const handleInputChange = (evt) => {
        setQueryString(evt.target.value)
    }

    const sidebar = useRef();
    useEffect(() => {
        sidebar.current.ref.current.scrollTop = props.sidebarScroll;
    }, [props.sidebarLoaded]);

    return (<>
        <div style={{ posiiton: 'fixed' }}>
            <Sidebar.Pushable
                style={{
                    backgroundColor: 'transparent',
                    width: 300,
                    height: 'calc(100vh - 62px)',
                    margin: 0,
                    right: 0,
                    top: 0,
                    posiiton: 'absolute',
                    display: (props.sidebarIsDisplayed ? 'block' : 'none'),
                    overflow: 'hidden',

                }}
            >
                <Sidebar
                    style={{
                        width: 300,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        visibility: ((props.saving) ? "hidden" : "visible"),
                        overflow: 'hidden',
                        overscrollBehaviorX: 'contain'
                    }}
                    animation='overlay'
                    direction='right'
                    inverted
                    vertical
                    visible={(props.sidebarIsVisible)}
                >
                    <div style={{ height: 50, backgroundColor: 'black' }}>
                        <Input style={{ position: 'absolute', left: 68, top: 8 }} icon='search' placeholder='Search...' onChange={handleInputChange} />
                    </div>
                    {
                        ((!props.pageEnd || props.sidebarIsPinned) && !(props.sidebarIsDisplayed && !props.sidebarIsVisible)) ? (
                            <Icon style={{ position: 'absolute', right: 247, top: 9, backgroundColor: 'black', cursor: 'pointer' }} inverted name='times circle outline' size='big'
                                onClick={() => {
                                    props.hideSidebar()
                                    props.unpinSidebar()
                                }} />
                        ) : (
                                <Icon style={{ position: 'absolute', right: 247, top: 9, backgroundColor: 'black', cursor: 'pointer' }} inverted name='thumbtack' size='large'
                                    onClick={() => {
                                        props.pinSidebar()
                                    }} />
                            )
                    }
                    <Sidebar.Pushable
                        style={{
                            border: 'none',
                            width: 300,
                            height: 'calc(100% - 50px)',
                            margin: 0,
                            right: 0,
                            top: 0,
                            posiiton: 'absolute'
                        }}
                    >

                        <Sidebar
                            ref={sidebar}
                            onScroll={() => props.handleSidebarScroll(sidebar.current.ref.current.scrollTop)}
                            style={{
                                width: 300,
                                backgroundColor: 'rgba(0,0,0,.8)',
                                visibility: ((props.saving) ? "hidden" : "visible"),
                                overflowX: 'hidden'
                            }}
                            as={Menu}
                            animation='overlay'
                            direction='right'
                            inverted
                            vertical
                            visible={true}
                        >
                            {(props.sidebarLoaded) ? (<>
                                {props.bank.filter(preset => preset.presetName.toLowerCase().includes(queryString.toLowerCase())).map(preset => {
                                    return (
                                        <Menu.Item style={{ textOverflow: 'ellipsis' }} value={preset.id} onClick={() => props.renderPresetFromSideBar(preset)} as='a'>{preset.presetName}</Menu.Item>
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