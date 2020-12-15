// Components
import VideoChat from './pageComponents/videoChat/VideoChat';

// Stylesheet
import './App.scss';

import axios from 'axios';
axios.defaults.baseURL = 'https://us-central1-video-chat-c19d6.cloudfunctions.net/api';

function App() {
  return (
    <div className="App">
      <VideoChat />
    </div>
  );
};

export default App;
