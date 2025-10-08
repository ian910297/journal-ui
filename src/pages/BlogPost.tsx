import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Post } from '../services/api';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await api.getPost(id);
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <Link to="/">← Back to posts</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <p>Post not found</p>
        <Link to="/">← Back to posts</Link>
      </div>
    );
  }

  return (
    <article>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to posts
      </Link>
      
      <h1>{post.title}</h1>
      
      <time style={{ color: '#666', fontSize: '0.9rem', display: 'block', marginBottom: '2rem' }}>
        {formatDate(post.created_at)}
      </time>
      
      <div style={{ lineHeight: '1.7' }}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;