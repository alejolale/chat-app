const io = require('./index.js').io;

const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events');
const { createMessage, createChat, createUser } = require("../Factories");

let connectedUsers= {};

module.exports = function(socket) {
    console.log('Socket id: ' + socket.id);

    //Verify userName
    socket.on(VERIFY_USER, (nickname, callback)=> {
        //here we can create a new user with it's id havin a callback function from LoginForm
        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null});
        }else {
            callback({isUser: false, user:createUser({name: nickname})});
        }
    });

    //user connects with username
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers= addUser(connectedUsers, user);
        socket.user= user;

        io.emit(USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
        
    });
    
}

const addUser= (userList, user) => {
    let newList= Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
};

const removeUser= (userList, userName) => {
    let newList= Object.assign({}, userList);
    delete newList[userName];
    return newList;
};

const isUser = (userList, userName) => { 
    return userName in userList
};
