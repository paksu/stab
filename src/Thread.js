import React, { Component } from 'react';
import { Card, CardBlock, CardTitle, Collapse } from 'reactstrap';
import Message from './Message'
import { Colors } from './constants'


class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      collapsed: nextProps.collapsed
    });
  }

  toggleCollapse() {
    this.setState((prevState) => {
      return {collapsed: !prevState.collapsed};
    });
  }
  render() {
    const {id, subject, messages, participants} = this.props;
    return (
      <Card style={{marginBottom: "1em"}}>
        <CardBlock style={{borderBottom: "1px solid #ddd"}}>
          <CardTitle>
            {subject}
            {" "}
            <a id={id} href={`#${id}`} className="small">
              <i className="fa fa-link" />
            </a>
            <div className="float-right small">
              <a onClick={this.toggleCollapse} href="javascript:void(0);">
                <i  className={this.state.collapsed ? "fa fa-plus" : "fa fa-minus"} />
              </a>
              {" "}
            </div>
          </CardTitle>
          <div>
            {participants.sort().map(participant => {
              return <span style={{ display: "inline-block", width: "1rem", height: "1rem", background: Colors[participant] }} key={participant}></span>
            })}
          </div>
        </CardBlock>
        <Collapse isOpen={!this.state.collapsed}>
          {messages.map((message, index) => {
            return <Message {...message} key={index}/>
          })}
       </Collapse>
     </Card>
    )
  }
}
export default Thread;
