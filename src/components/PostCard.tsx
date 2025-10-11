import React from 'react';
import { Post } from '../types';


interface PostCardProps {
  post: Post;
}

// Individual post card component - displays post information
const PostCard = ({ post }: PostCardProps) => {
  // Format date in English
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }).format(date);
  };

  // Get initials if avatar image fails to load
  const getInitials = (name: string): string => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <article className="post-card">
      {/* Categories at the top */}
      <header className="post-card-header">
        <div className="post-categories">
          {post.categories.map((category) => (
            <span key={category.id} className="category-tag">
              {category.name}
            </span>
          ))}
        </div>
      </header>

      {/* Main content */}
      <div className="post-card-content">
        <h3 className="post-title" title={post.title}>
          {post.title}
        </h3>
        
        <p className="post-summary">
          {post.summary}
        </p>
      </div>

      {/* Footer with author and date */}
      <footer className="post-card-footer">
        <div className="post-author">
          {/* Author avatar with fallback to initials */}
          <div className="author-avatar">
            <img 
              src={post.author.avatar} 
              alt={`Avatar of ${post.author.name}`}
              onError={(e) => {
                // If image fails to load, show initials instead
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const initials = target.parentElement?.querySelector('.avatar-initials');
                if (initials) {
                  (initials as HTMLElement).style.display = 'flex';
                }
              }}
            />
            <div className="avatar-initials" style={{ display: 'none' }}>
              {getInitials(post.author.name)}
            </div>
          </div>
          {/* Author information */}
          <div className="author-info">
            <span className="author-name">{post.author.name}</span>
            <time className="post-date" dateTime={post.publishDate}>
              {formatDate(post.publishDate)}
            </time>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default PostCard;