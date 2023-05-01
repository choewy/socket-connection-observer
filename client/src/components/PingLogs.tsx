import { FC } from 'react';

export const PingLogs: FC<{ pings: string[] }> = ({ pings }) => {
  return (
    <div>
      <h3>Ping Logs</h3>
      <ul>
        {pings.map((ping) => (
          <li>ping: {ping}</li>
        ))}
      </ul>
    </div>
  );
};
