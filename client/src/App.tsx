import { socketConnection } from './connection';

export default function App() {
  const { sockets, events, pings } = socketConnection.useConnect();

  return (
    <div>
      {sockets.map((socket) => (
        <div>
          {socket.id}: {socket.name}
        </div>
      ))}
      {events.map((event) => (
        <div>event: {event}</div>
      ))}
      {pings.map((ping) => (
        <div>ping: {ping}</div>
      ))}
    </div>
  );
}
