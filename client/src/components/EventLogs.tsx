import { FC } from 'react';

export const EventLogs: FC<{ events: string[] }> = ({ events }) => {
  return (
    <div>
      <h3>Event Logs</h3>
      <ul>
        {events.map((event) => (
          <li>event: {event}</li>
        ))}
      </ul>
    </div>
  );
};
