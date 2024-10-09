import React, { useState } from 'react';
import PostList from './PostList'; 
import '../Post.css'; 

function Posts() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Actualiza el estado de búsqueda cuando se escribe algo en el campo
  };

  return (
    <div className="posts-container">
      <h1>Posts</h1>

      <div className="posts-content">
        
        <PostList searchTerm={searchTerm} /> 
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        
      </div>
    </div>
  );
}

export default Posts;
