import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

export class SocketConnection {
  private readonly ws = io('ws://localhost:4000', {
    transports: ['websocket'],
    auth: { name: 'choewy' },
  });

  useConnect() {
    const [sockets, setSockets] = useState<{ id: string; name: string }[]>([]);
    const [pings, setPings] = useState<string[]>([]);
    const [events, setEvents] = useState<string[]>([]);

    useEffect(() => {
      if (this.ws.connected) {
        return;
      }

      this.ws.on('init', (res) => {
        setSockets(res);
        setEvents((prev) => ['init'].concat(prev));
      });

      this.ws.on('ping', () => {
        setPings((prev) => [new Date().toISOString()].concat(prev));
        this.ws.emit('ping');
      });

      this.ws.on('connect', () => {
        setEvents((prev) => ['connect'].concat(prev));
      });

      this.ws.on('disconnect', () => {
        setEvents((prev) => ['disconnect'].concat(prev));

        /** @description reload */
        setTimeout(() => window.location.reload(), 1500);

        /** @description reconnect */
        setTimeout(() => this.ws.connect());
      });

      this.ws.connect();
    }, [setSockets]);

    return { sockets, pings, events };
  }
}

export const socketConnection = new SocketConnection();
