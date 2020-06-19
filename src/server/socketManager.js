const io = require('./index.js').io;

const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events');
const { createMessage, createChat, createUser } = require("../Factories");

const connectedUser= {};

module.exports = function(socket) {
    console.log('Socket id: ' + socket.id);

    //Verify userName
    socket.on(VERIFY_USER, (nickname, callback)=> {
        if (isUser) {
            callback({ isUser: true, user: null});
        }else {
            callback({isUser: false, user:createUser({name: nickname})});
            
        }
    });
    
}



//minute 42
            //https://www.youtube.com/watch?v=84GXJANOYFw