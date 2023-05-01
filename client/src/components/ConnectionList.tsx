import { FC } from 'react';

export const ConnectionList: FC<{
  sockets: Array<{ id: string; name: string }>;
}> = ({ sockets }) => {
  return (
    <div>
      <h3>Connection List</h3>
      <ul>
        {sockets.map((socket) => (
          <li>
            {socket.id}: {socket.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
