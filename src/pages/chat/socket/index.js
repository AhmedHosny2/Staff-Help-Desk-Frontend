import { io } from "socket.io-client";
import { socketListenEvent } from "./event";

export const initSocket = ({ setSocketValue }) => {
  const url = process.env.REACT_APP_LIGHTCHAT_URL;
  const socket = io(url);

  socketListenEvent(socket, { setSocketValue });
  setSocketValue((prev) => ({ ...prev, socket }));
};
