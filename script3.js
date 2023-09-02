const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const startCallButton = document.getElementById('start-call');
const endCallButton = document.getElementById('end-call');
const toggleAudioButton = document.getElementById('toggle-audio');
const toggleVideoButton = document.getElementById('toggle-video');
const chatContainer = document.getElementById('chat');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

let localStream = null;
let remoteStream = null;

// Get user media
async function getMedia() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
}

// Start call
startCallButton.addEventListener('click', () => {
    if (localStream === null) {
        getMedia();
    }
});

// Toggle audio
toggleAudioButton.addEventListener('click', () => {
    localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
    });
});

// Toggle video
toggleVideoButton.addEventListener('click', () => {
    localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
    });
});

// End call functionality
function endCall() {
    localStream.getTracks().forEach(track => {
        track.stop();
    });

    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    chatContainer.innerHTML = '<p>Call ended.</p>';
}

// Listen for end call button click
endCallButton.addEventListener('click', endCall);

// Chat functionality
sendButton.addEventListener('click', () => {
    const message = chatInput.value;
    chatInput.value = '';

    const messageElement = document.createElement('div');
    messageElement.textContent = `You: ${message}`;
    chatContainer.appendChild(messageElement);
});

// Simulate receiving message
function receiveMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `Friend: ${message}`;
    chatContainer.appendChild(messageElement);
}

// Simulate receiving video stream
function receiveRemoteStream(stream) {
    remoteVideo.srcObject = stream;
}

// Simulate receiving video and chat data
setTimeout(() => {
    receiveMessage('Hey!!');
    receiveMessage('How are you???');
    remoteStream = localStream;
    receiveRemoteStream(remoteStream);
}, 3000);
