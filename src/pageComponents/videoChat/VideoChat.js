import React, { useState, useCallback } from 'react';
import axios from 'axios';

// Stylesheet
import './VideoChat.scss';

function VideoChat(props) {

    const [ userName, setUserName ] = useState('macdawg');
    const [ roomName, setRoomName ] = useState('macdawgs room');
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
        }
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


    return (
        <div>
            <button onClick={handleSubmit}>click</button>
        </div>
    );
};

export default VideoChat;