import React, { Component } from "react";
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


function MyVerticallyCenteredModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <TwitterTimelineEmbed
          sourceType="profile"
          screenName={props.tweet}
          options={{height: 4000}}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class twitter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweet: 'JulienClerc_Off',
      service: '',
      modalShow: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  };
handleSubmit(event) {
  event.preventDefault()
  let yolo= this.state.tweet
  console.log("MY DATA " + yolo)
};

handleChange(event) {
  this.setState({ 
    // Computed property names 
    // keys of the objects are computed dynamically 
    [event.target.name] : event.target.value
  })
};

render() {

  return (
    <div>
      <form onSubmit={this.handleSubmit}>
      <input name='tweet' type='text' id='twitter' onChange={this.handleChange} value={this.state.tweet} />
      {/* <Button >Twitter</Button> */}
      <button variant="info" onClick={() => this.setState({ modalShow: this.state.modalShow= true })}>
        Timeline of @{this.state.tweet}
      </button>
      </form>
        <>
      <MyVerticallyCenteredModal 
        tweet={this.state.tweet}
        show={this.state.modalShow}
        onHide={() => this.setState({ modalShow: this.state.modalShow= false })}
      />
    </>
    </div>

    );
  }   
}  

export default twitter;