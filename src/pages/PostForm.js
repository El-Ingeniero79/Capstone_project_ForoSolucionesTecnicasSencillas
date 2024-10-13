import React, { useState } from 'react';
import axios from '../.api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import '../CreateForm.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [restricted, setRestricted] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = { 
      title, 
      content, 
      restricted 
    };

    try {
      await axios.post('/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      Swal.fire({
        title: 'Lo has hecho genial',
        text: '¡¡¡¡¡has creado tu post con éxito!!!!!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      
      // Redirigir a la página de posts después de la creación correcta del post
      navigate('/posts'); 
      
      setTitle('');
      setContent('');
      setRestricted(false);
    } catch (error) {
      console.error('Error creando el post:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="postform-container">
      <div className="postform-card">
        <h1 className="form-title">Crear Post</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Contenido"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control textarea"
              required
            />
          </div>
          <div className="restricted-label">
            <label>
              <input
                type="checkbox"
                checked={restricted}
                onChange={(e) => setRestricted(e.target.checked)}
              />
              Post Restringido
            </label>
          </div>
          <button type="submit" className="btn-primary">Crear Post</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
