import React, {useEffect, useState} from 'react'
import {Avatar, IconButton} from "@material-ui/core"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchOutlined from "@material-ui/icons/SearchOutlined"

import db from "./firebase.js";
import { useStateValue } from "./StateProvider"

import SidebarChat from "./SidebarChat"
import './Sidebar.css'

function Sidebar() {

    const [rooms, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(room => ({
                id: room.id,
                data: room.data(),
            })))
        })

        return () => {
            unsubscribe();
        }
        
    }, []);

    return (
        <div className="sidebar">

            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <h3>{user.displayName}</h3>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">

                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text"/>

                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => 
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                )}
                

            </div>

        </div>
    )
}

export default Sidebar
