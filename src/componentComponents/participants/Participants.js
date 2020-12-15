import React, { useState, useRef, useEffect } from 'react';

function Participants({participant}) {

    const [ videoTracks, setVideoTracks ] = useState([]);
    const [ audioTracks, setAudioTracks ] = useState([]);

    const videoRef = useRef(null);
    const audioRef = useRef(null);

    // filter out track publications that are null
    const trackpubsToTracks= trackMap => Array.from(trackMap.values())
        .map(publication => publication.track)
        .filter(track => track !== null);

    // handle subscriptions
    useEffect(() => {

        const subscribeTrack = (track) => {
            if (track.kind === 'video') {
                setVideoTracks(videoTracks => [...videoTracks, track]);
            } else {
                setAudioTracks(audioTracks => [...audioTracks, track]);
            }
        };
        const unsubscribeTrack = (track) => {
            if (track.kind === 'video') {
                setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
            } else {
                setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
            }
        };

        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        participant.on('trackSubscribed', subscribeTrack);
        participant.on('trackUnsubscribed', unsubscribeTrack);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);

    // handle attaching video/audio to DOM
    useEffect(() => {

        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current);
            return () => {
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    useEffect(() => {

        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(videoRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

    return (
        <div className="participant">
            <h3>
                {participant.identity}
            </h3>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    );
}

export default Participants;