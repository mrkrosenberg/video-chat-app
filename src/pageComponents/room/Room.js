import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';

// Components
import Participant from '../../componentComponents/participants/Participants';

// Stylesheet
import './Room.scss';

function Room({ roomName, token, handleLeaveRoom }) {

    const [ room, setRoom ] = useState(null);
    const [ participants, setParticipants ] = useState([]);
    let remoteParticipants;

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
    if (participants) {
        remoteParticipants = participants.map(participant => {
            return <Participant key={participant.sid} participant={participant} />
       });
    };
    

    return (
        <div className="room">
            <h2>Room: {roomName}</h2>
            <button onClick={handleLeaveRoom}>Log out</button>
            <div className="local-participant">
                {room ? (
                    <Participant key={room.localParticipant.sid} participant={room.localParticipant} />
                ) : (
                    ''
                )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants ? remoteParticipants : null}</div>
      </div>
    );
}

export default Room;