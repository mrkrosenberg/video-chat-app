import React from 'react';

// Stylesheet
import './Lobby.scss';

function Lobby({ userName, handleUserNameChange, roomName, handleRoomNameChange, handleSubmit }) {


    return (
        <form onSubmit={handleSubmit}>
            <h1>
                Enter a room
            </h1>
            <div>
                <label htmlFor="name">
                    Name:
                </label>
                <input 
                    type="text"
                    id="field"
                    value={userName}
                    onChange={handleUserNameChange}
                    required
                />
            </div>
            <div className="">
                <label htmlFor="room">
                    Room name:
                </label>
                <input 
                    type="text"
                    id="room"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    required
                />
            </div>
            <div className="button-container">
                <button type="submit"></button>
            </div>
        </form>
    );
};

export default Lobby;