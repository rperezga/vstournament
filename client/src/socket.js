import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.150.127:8080');

function subscribeToTimer(cb) {
    socket.on('changeUpdate', value => cb(value));
    socket.emit('subscribeToTimer', 1000);
}

export { subscribeToTimer }