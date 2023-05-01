import { RemoteSocket, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type WebsocketData = {
  name: string;
  timer: NodeJS.Timer;
  ping: boolean;
};

export type WebsocketClientMap = RemoteSocket<DefaultEventsMap, any> & WebsocketData;
export type WebsocketClient = Socket & WebsocketData;
