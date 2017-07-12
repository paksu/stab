import React from 'react';
import { CardBlock, CardTitle } from 'reactstrap';
import { Colors } from './constants'

const Message = ({time, id, from, body}) => {
  return (
    <CardBlock style={{borderBottom: "1px solid #eee"}}>
        <CardTitle tag="h6">
          <span style={{ display: "inline-block", width: "1rem", height: "1rem", marginRight: "0.2rem", background: Colors[from] }}> </span>
          {from} {"|"} <span className="text-muted">{time}</span>
          {" "}
          <a id={`message_${id}`} href={`#message_${id}`}>
            <i className="fa fa-link" />
          </a>
        </CardTitle>
        <div style={{whiteSpace: "pre-line"}}>{body}</div>
    </CardBlock>
  )
}

export default Message;
