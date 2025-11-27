const dgram = require('dgram');

class RetroArchClient {
  constructor(options = {}) {
    this.host = options.host || '127.0.0.1';
    this.port = options.port || 55355;
    this.socket = null;
    this.connected = false;
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        resolve();
        return;
      }

      try {
        this.socket = dgram.createSocket('udp4');
        
        this.socket.on('error', (err) => {
          console.error('RetroArch client error:', err);
          this.connected = false;
        });

        this.connected = true;
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  send(command) {
    return new Promise((resolve, reject) => {
      if (!this.connected || !this.socket) {
        reject(new Error('Client not connected. Call connect() first.'));
        return;
      }

      const message = Buffer.from(command);

      this.socket.send(message, 0, message.length, this.port, this.host, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.connected = false;
    }
  }
  isConnected() {
    return this.connected;
  }
}

module.exports = RetroArchClient;
