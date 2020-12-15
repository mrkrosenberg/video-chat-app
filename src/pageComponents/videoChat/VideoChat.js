import React, { useState, useCallback } from 'react';
import axios from 'axios';

// Components
import Lobby from '../lobby/Lobby';
import Room from '../room/Room';

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
            .then(tokenResponse => {
                setToken(tokenResponse.data.token)
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
        <Room 
            roomName={roomName}
            token={token}
            handleLeaveRoom={handleLeaveRoom}
        />
    ) : (
        <Lobby 
            userName={userName}
            roomName={roomName}
            handleUserNameChange={handleUsernameChange}
            handleRoomNameChange={handleRoomNameChange}
            handleSubmit={handleSubmit}
        />
    );


    return (
        lobbyMarkup
    );
};

export default VideoChat;