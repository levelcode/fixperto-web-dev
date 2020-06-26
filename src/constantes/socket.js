
import io from "socket.io-client";
var socket = io("https://api.fixperto.com", { transports: ["websocket"] });
export default socket;