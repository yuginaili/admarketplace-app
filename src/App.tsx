import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import Error from './pages/Error';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
