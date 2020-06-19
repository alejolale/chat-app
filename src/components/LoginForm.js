import React, { useState } from 'react';
import { VERIFY_USER } from '../Events';

const LoginForm = ({socket, setNewUser, user}) => {

    const [nickname, setNickname]= useState("");
    const [error, setError]= useState(null);

    const setUser = ({user, isUser}) => {
        console.log(user, isUser);
        
        if (isUser) {
            setError('UserName Taken')
        }else {
            setError(null)
            setNewUser(user);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Into handle`);
        
        
        socket.emit(VERIFY_USER, nickname, setUser);
        
    };

    const handleChange = (e) => {        
        setNickname(e.target.value);
    };

    const setNewError = (error) => {
        setError(error);
    };

    return(
        <div className="login">
            <form onSubmit={handleSubmit} className='login-form'>
                <label htmlFor="nickname">
                    <h2>Got a nickname?</h2>
                </label>
                <input 
                    type='text'
                    id="nickname" 
                    value={nickname} 
                    onChange={handleChange} 
                    placeholder="My cool username"
                    />
                <div className="error">{error ? error : null}</div>
            </form>
        </div>
    );
}

export default LoginForm;