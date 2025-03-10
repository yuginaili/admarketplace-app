import { Routes, Route } from 'react-router-dom';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import NotFound from './pages/NotFound';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/posts/:postId" element={<PostDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
