import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
            onClick={onClose}
        >
            <div 
                style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', position: 'relative', width: '90%', maxWidth: '400px' }}
                onClick={e => e.stopPropagation()}
            >
                <h2 style={{ marginBottom: '1rem', color: '#333' }}>Login Required</h2>
                <p style={{ marginBottom: '2rem', color: '#555' }}>Please log in or create an account to read the full blog post.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button style={{ padding: '0.75rem 1.5rem', border: 'none', borderRadius: '5px', backgroundColor: '#6A5AF9', color: 'white', cursor: 'pointer', fontSize: '1rem' }} onClick={() => navigate('/login')}>Login</button>
                    <button style={{ padding: '0.75rem 1.5rem', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: 'white', color: '#333', cursor: 'pointer', fontSize: '1rem' }} onClick={() => navigate('/register')}>Register</button>
                </div>
                <button 
                    style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}
                    onClick={onClose}
                >&times;</button>
            </div>
        </div>
    );
};

export default LoginPromptModal;