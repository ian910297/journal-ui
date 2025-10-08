import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Whoami from './pages/Whoami';
import BlogPostList from './pages/BlogPostList';
import BlogPost from './pages/BlogPost';
import Layout from './components/Layout';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whoami" element={<Whoami />} />
          <Route path="/posts" element={<BlogPostList />} />
          <Route path="/posts/:id" element={<BlogPost />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
