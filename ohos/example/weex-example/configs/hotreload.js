const WebSocket = require('ws');
const clients = [];

class WsServer {
  constructor(wsport) {
    this.clients = []
    this.startWebSocket(wsport)
  }

  startWebSocket(wsport) {
    let wss = new WebSocket.Server({
      port: wsport
    });

    wss.on('connection', (ws) => {
      this.clients.push(ws);
      ws.on('message', (message) => {
        this.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send('websocket connected', (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        });
      });
      // websocket close handle
      ws.on('close', () => {
        ws.close();
        ws._socket.destroy();
        this.clients.splice(this.findClient(ws.upgradeReq.url));
      });
      ws.on('error', (error) => {
        if (error) {
          ws.close();
          ws._socket.destroy();
          this.clients.splice(this.findClient(ws.upgradeReq.url), 1);
        }
      });
    });
    
    this.wss = wss;
    return wss;
  }

  // send web socket messsage to client
  sendSocketMessage(message) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message || 'refresh', (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
  }

  findClient(url) {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].upgradeReq.url === url) {
        return i;
      }
    }
    return null;
  }
}

module.exports = WsServer