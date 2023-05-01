import { Namespace } from 'socket.io';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { WebsocketClient, WebsocketClientMap } from './types';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Namespace;

  async handleConnection(socket: WebsocketClient): Promise<void> {
    socket.name = socket.handshake.auth.name;
    socket.ping = true;

    console.log('connect', [socket.id, socket.name].join(':'));

    const timerCallback = async () => {
      if (!socket.ping) {
        socket.disconnect(true);
      }

      socket.ping = false;
      socket.emit('ping');
    };

    socket.timer = setInterval(timerCallback, 5000);

    const maps = await this.fetchSocketMaps();

    this.server.emit('init', maps);
  }

  async handleDisconnect(socket: WebsocketClient): Promise<void> {
    console.log('disconnect', [socket.id, socket.name].join(':'));

    clearInterval(socket.timer);

    const maps = await this.fetchSocketMaps();
    this.server.emit('init', maps);
  }

  private async fetchSockets(): Promise<WebsocketClientMap[]> {
    return this.server.fetchSockets() as Promise<WebsocketClientMap[]>;
  }

  private async fetchSocketMaps(): Promise<{ id: string; name: string }[]> {
    return this.fetchSockets().then((sockets) => sockets.map(({ id, name }) => ({ id, name })));
  }

  @SubscribeMessage('ping')
  onPing(@ConnectedSocket() socket: WebsocketClient): void {
    console.log('ping', [socket.id, socket.name].join(':'));

    socket.ping = true;
  }
}
