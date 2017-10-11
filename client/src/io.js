import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

const io = sailsIOClient(socketIOClient);
// Tell socket.io where the server is
io.sails.url = 'http://localhost:1337';

export default io 
