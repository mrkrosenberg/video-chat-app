import React, { useState, useCallback } from 'react';
import axios from 'axios';

// Components
import Lobby from '../lobby/Lobby';

// Stylesheet
import './VideoChat.scss';

function VideoChat(props) {

    const [ userName, setUserName ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const [ token, setToken ] = useState(null);

    const handleUsernameChange = useCallback(event => {

        setUserName(event.target.value);
    }, []);
    
    const handleRoomNameChange = useCallback(event => {

        setRoomName(event.target.value);
    }, []);

    const handleSubmit = useCallback(event => {

        event.preventDefault();

        const tokenConfig = {
            identity: userName,
            room: roomName
        };
        axios.post('/video/token', tokenConfig)
            .then(token => {
                console.log('token: ', token)
            })
            .catch(err => {
                console.error('error: ', err)
            })
    }, [userName, roomName]);

    const handleLeaveRoom = useCallback(event => {

        setToken(null);
    }, []);

    // Markup
    const lobbyMarkup = token ? (
        <div className="">
            <p>Username: {userName}</p>
            <p>Room name: {roomName}</p>
            <p>Token: {token}</p>
        </div>
    ) : (
        <Lobby 
            userName={userName}
            roomName={roomName}
            handleUserNameChange={handleUsernameChange}
            handleRoomNameChange={handleRoomNameChange}
            handleSubmit={handleSubmit}
        />
    )


    return (
        lobbyMarkup
    );
};

export default VideoChat;