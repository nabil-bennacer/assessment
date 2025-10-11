import React from 'react';
import PostList from './PostList';


function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Blog Articles</h1>
        <p>Discover our latest blog posts</p>
      </header>

      <main className="app-main">
        <PostList />
      </main>
    </div>
  );
}

export default App;
