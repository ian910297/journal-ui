import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Post } from '../services/api';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const newPosts = await api.getPosts(page, 10);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error && posts.length === 0) {
    return (
      <div>
        <h1>Blog Posts</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      
      {posts.length === 0 && !loading ? (
        <p>No posts yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {posts.map(post => (
            <article key={post.uuid} style={{ 
              borderBottom: '1px solid #eaeaea', 
              paddingBottom: '1.5rem' 
            }}>
              <h2>
                <Link to={`/posts/${post.uuid}`}>{post.title}</Link>
              </h2>
              <time style={{ color: '#666', fontSize: '0.9rem' }}>
                {formatDate(post.created_at)}
              </time>
              <p style={{ marginTop: '0.5rem', color: '#555' }}>
                {post.content.substring(0, 200)}...
              </p>
            </article>
          ))}
        </div>
      )}

      {hasMore && (
        <button 
          onClick={loadPosts} 
          disabled={loading}
          style={{ marginTop: '2rem' }}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default HomePage;
