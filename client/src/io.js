import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'


var io

function initializeSocket(token){

    if(socketIOClient.sails){
      console.log(socketIOClient.sails);
      console.log("Existe una conexion de socket, persistir");
      io = socketIOClient;
    }else{
      console.log("No existe una conexion de socket, crearla");
      io = sailsIOClient(socketIOClient);
      io.sails.url = 'http://localhost:1337';
      io.sails.transports = ['websocket']
      io.sails.useCORSRouteToGetCookie=false
      io.sails.rejectUnauthorized = false
      //io.sails.reconnection = true
      io.sails.headers = {
          'Authorization': 'JWT '+token
      };
    }


}


export {io, initializeSocket}
