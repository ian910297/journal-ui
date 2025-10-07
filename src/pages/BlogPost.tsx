import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock markdown content for now
  const markdownContent = `
# This is a blog post

This is the content of blog post with id: **${id}**.

*   List item 1
*   List item 2
  `;

  return (
    <div>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;
