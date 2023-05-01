import { socketConnection } from './core';
import { ConnectionList, EventLogs, PingLogs } from './components';

export default function App() {
  const { sockets, events, pings } = socketConnection.useConnect();

  return (
    <div>
      <ConnectionList sockets={sockets} />
      <EventLogs events={events} />
      <PingLogs pings={pings} />
    </div>
  );
}
