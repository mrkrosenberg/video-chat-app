// Components
import VideoChat from './pageComponents/videoChat/VideoChat';

// Stylesheet
import './App.scss';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5001/video-chat-c19d6/us-central1/api';

function App() {
  return (
    <div className="App">
      <VideoChat />
    </div>
  );
};

export default App;
