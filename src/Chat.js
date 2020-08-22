import React, {useEffect, useState, useRef} from 'react'
import {Avatar, IconButton} from "@material-ui/core"
import SearchOutlined from "@material-ui/icons/SearchOutlined"
import AttachFile from "@material-ui/icons/AttachFile"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import * as Scroll from 'react-scroll';

import {useStateValue} from "./StateProvider"

import {useParams} from "react-router-dom"
import db from "./firebase";

import firebase from "firebase"
import ReactPlayer from 'react-player'


import "./Chat.css";


function Chat() {
    
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const [rickRoll, setRickRoll] = useState(false);
    const [rickRollUrl, setRickRollUrl] = useState("");

    const divRef = useRef(null);
    

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            })

            db.collection("rooms").doc(roomId)
            .collection("messages").orderBy('timestamp', 'asc')
            .onSnapshot(msgSnapshot => (
                setMessages(msgSnapshot.docs.map(msg => msg.data()))
            ))
            // console.log(messages)
        }
    }, [roomId])
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    useEffect(() => {
        if(rickRoll){
            // db.collection('videos').onSnapshot(snapshot => {
            //     // setRickRollUrl()
            //     setRickRollUrl(snapshot.docs.map(video => (
            //         // console.log()
            //         video.data().rickroll
            //     )))
            // })
            setRickRollUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        }
        else{
            setRickRollUrl("");
        }
        divRef.current.scrollIntoView({ behavior: 'smooth' });

    }, [rickRoll])

    const displayVideo = () => {

        if(rickRoll) {
            return <ReactPlayer url={rickRollUrl}  width="100%" height="100%" controls={true} playing={true} />
        }
    }

    const sendMessage = (event) => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
        event.preventDefault();
        console.log("Typed: ", input)
        setInput("");
        if(input != ""){
            db.collection("rooms").doc(roomId).collection("messages").add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last active {" "} 
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}
                    </p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile onClick={() => {setRickRoll(!rickRoll)}}/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className="chat_body" >

                {messages.map(message => (
                <p ref={divRef} className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toLocaleString()}
                    </span>
                </p>
                ))}

                {displayVideo()}

                

                <div ref={divRef}></div>


            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" value={input} onChange={event => {setInput(event.target.value)}} />
                    <button onClick={sendMessage} type="submit" placeholder="Enter a message">Send</button>
                </form>
                <MicIcon />
            </div>

        </div>
    
    )
}

export default Chat
