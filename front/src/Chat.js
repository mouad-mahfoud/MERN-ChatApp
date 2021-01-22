import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons/index";
import React from "react";
import "./Chat.css";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at ....</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Momo</span>
          My awesome message
          <span className="chat__timestamp">{new Date().toLocaleString()}</span>
        </p>
        <p className="chat__message chat__receiver">
          <span className="chat__name">Momo</span>
          My awesome message
          <span className="chat__timestamp">{new Date().toLocaleString()}</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Momo</span>
          My awesome message
          <span className="chat__timestamp">{new Date().toLocaleString()}</span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button type="submit">send</button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
