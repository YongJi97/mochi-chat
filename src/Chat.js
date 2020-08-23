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
    const [backgroundImage, setBackgroundImage] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    const divRef = useRef(null);

    const arrImages = [
        "https://3.bp.blogspot.com/-yCWzhevjj7k/VvG3M43KLUI/AAAAAAACFTQ/b1SUDzztqJ8tQNVMi-uZPw0GtPljPuq5g/s1600/chickie%2Bmochi.jpg",
        "https://i.pinimg.com/originals/f7/9b/5e/f79b5e3af8c741bbc1dafdc01a01e9c2.jpg",
        "https://i.pinimg.com/originals/79/5c/ab/795cabc4647f73b365e2e6eabd0f34dc.png",
        "https://wallpapercave.com/wp/cqhO8rQ.jpg",
        "https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-small-clear-and-beautiful-literary-background-backgroundsmall-clear-backgroundgreen-image_62321.jpg",
        "https://wallpapercave.com/wp/wp4410714.jpg"
    ]
    
    useEffect(() => {
        setImageUrl(arrImages[backgroundImage])
    }, [backgroundImage])

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

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    const toggleBackgroundImage = () => {
        if(backgroundImage >= 5){
            setBackgroundImage(0);
        }else {
            setBackgroundImage(backgroundImage+1);
        }
        console.log(backgroundImage)
    }

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
                profilePic: user.photoURL,
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
                        <SearchOutlined onClick={() => toggleBackgroundImage()}/>
                    </IconButton>
                    <IconButton>
                        <AttachFile onClick={() => {setRickRoll(!rickRoll)}}/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className="chat_body" style={{backgroundImage : `url(${imageUrl})`}}>
                {console.log(messages)}
                

                {messages.map(message => (
                <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                    <div className="chat_message_div">
                        <span className="profilePic"> <Avatar src={message.profilePic}/></span>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                    </div>

                    
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toLocaleString()}
                    </span>
                </p>
                ))}

                {displayVideo()}

                
                <div className="bottomDiv" ref={divRef}></div>


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
