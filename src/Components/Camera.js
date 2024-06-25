import userImage from "../Assets/nouser.png";
import React, { useState, useRef, useEffect } from 'react';
import { setProfilePic, getProfilePic } from "../DataBase/profileDB";

const Camera = ({ userId }) => {
    const [videoActive, setVideoActive] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        getProfilePic(userId)
            .then(url => {
                setProfilePicUrl(url || userImage);
            })
            .catch(error => {
                console.error('Error fetching profile picture:', error);
            });
    }, [userId]);

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    }

    const handleUpdateImage = (e) => {
        e.preventDefault();
        setVideoActive(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
            });
    }

    const handleCapture = async (e) => {
        e.preventDefault();
        videoRef.current.classList.toggle("cameraEffect");
        const canvas = document.getElementById('canvas');
        const aspectRatio = videoRef.current.videoWidth / videoRef.current.videoHeight;
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoWidth / aspectRatio;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        await setProfilePic(`${userId}`, imageDataUrl);
        setProfilePicUrl(imageDataUrl); // Update UI with new profile picture
        stopCamera();
        setTimeout(() => {
            setVideoActive(false);
        }, 200);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setVideoActive(false);
        stopCamera();
    }

    return (
        <>
            <div className="d-flex align-items-center position-relative">
                {!videoActive && (
                    <img
                        src={profilePicUrl}
                        alt="Profile Photo"
                        id='profilePic'
                        className="camera"
                    />
                )}
                {videoActive && (
                    <video ref={videoRef} className='camera video'></video>
                )}
                <canvas style={{ display: "none" }} width="800" height="800" id='canvas'>
                </canvas>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
                {!videoActive ? (
                    <button onClick={handleUpdateImage} className="btn btn-primary btn-sm" >Update Image</button>
                ) : (
                    <>
                        <button onClick={handleCapture} className="btn btn-primary btn-sm me-2" >Capture</button>
                        <button onClick={handleCancel} className="btn btn-secondary btn-sm" >Cancel</button>
                    </>
                )}
            </div>
        </>
    );
};

export default Camera;
