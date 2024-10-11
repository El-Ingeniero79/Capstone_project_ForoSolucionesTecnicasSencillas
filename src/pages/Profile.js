import React, { useEffect, useState } from 'react';
import axios from '../.api';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../Post.css';

function Profile() {
  const { user, loading } = useAuth(); 
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Obtenemos los posts del usuario autenticado
        const postResponse = await axios.get('/posts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        // Filtramos los posts para obtener solo los creados por el usuario autenticado
        const userPosts = postResponse.data.filter(post => post.user_id === user.id);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (user && !loading) {
      fetchProfileData();
    }
  }, [user, loading]);

  // Función para eliminar un post
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Actualizamos la lista de posts después de eliminar
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Función para manejar la edición de un post
  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);  
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h1>Mi perfil</h1>
      <div>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Nick:</strong> {user.nick || "Sin nick"}</p>  
      </div>

      <h2>Mis posts</h2>
      <p>Aqui tienes todos los posts que has escrito, pincha en el titulo y podras editarlos o borrarlos: </p>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p>{post.content.substring(0, 100)}...</p> 
            
            </li>
          ))
        ) : (
          <p>No has publicado ningún post.</p>
        )}
      </ul>
    </div>
  );
}

export default Profile;
