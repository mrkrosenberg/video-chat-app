import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';

// Stylesheet
import './Room.scss';

function Room({ roomName, token, handleLeaveRoom }) {

    const [ room, setRoom ] = useState(null);
    const [ participants, setParticipants ] = useState([]);

    useEffect(() => {
        
        const participantConnected = (participant) => {
            setParticipants(prevParticipants => [...prevParticipants, participant])
        };
        const participantDisconnected = (participant) => {
            setParticipants(prevParticipants => {
                prevParticipants.filter(p => p !== participant)
            });
        };
        Video.connect(token, {
            name: roomName
        })
        .then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.participants.forEach(participantConnected);
        });

        return () => {
            setRoom(currentRoom => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            })
        }
    }, [roomName, token]);

    // Participants markup
    const remoteParticipants = participants.map(participant => {
         return (<p key={participant.sid}>{participant.identity}</p>)
    });

    return (
        <div className="room">
            <h2>Room: {roomName}</h2>
            <button onClick={handleLeaveRoom}>Log out</button>
            <div className="local-participant">
                {room ? (
                    <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p>
                ) : (
                    null
                )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
      </div>
    );
}

export default Room;