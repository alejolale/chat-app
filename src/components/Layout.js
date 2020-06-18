import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events';
import LoginForm from './LoginForm';

const socketUrl= "http://172.16.21.86:3231";

const Layout = ({title}) => {

    const [socket, setSocket]= useState(null);
    const [user, setUser]= useState(null);

    useEffect(() => {  
        initSocket();
     }, []);


     //Connect and init the socket
    const initSocket= () => {

        setSocket(io(socketUrl));
        const socket= io(socketUrl);
        socket.on('connect', ()=> {
            console.log('connected');
        });
    };

    const setNewUser= (user) => {
        socket.emit(USER_CONNECTED, user);
    };

    const logout = () => {
        socket.emit(LOGOUT)
        setUser(null);
    };

    return(
        <div className='container'>
            <LoginForm socket={socket} setNewUser={setNewUser} user={user} />
        </div>
    );
};

export default Layout;