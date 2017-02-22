import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

import Header from '../../components/header';
import {vote} from '../../store/actions';

import './newPoll.scss';

const answer = (value, index, handelChange) => (
  <FormControl
    key={index}
    type="text"
    name={index}
    placeholder={'Another answer'}
    value={value}
    onChange={handelChange}
  />
);


const mapDispatchToProps = dispatch => ({
  vote: payload => dispatch(vote(payload)),
});

class NewPoll extends React.Component {
  state = {
    question: '',
    answer1: '',
    answer2: '',
    additionalAnswers: [],
  }

  handelInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const nameInt = parseInt(name, 10);
    if (Number.isInteger(nameInt)) {
      // Using map to create new array and treat state as immutable
      this.setState({
        additionalAnswers: this.state.additionalAnswers.map(
          (prevVal, index) => {
            if (index === nameInt) {
              return value;
            }
            return prevVal;
          },
        ),
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
    console.log(this.state);
  }

  addAnswers = () => {
    this.setState({
      additionalAnswers: [...this.state.additionalAnswers, '', ''],
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container text-center">
          <h1>New Poll</h1>
          <Row>
            <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
              <form className="newPoll_form">
                <FormGroup controlId="question">
                  <ControlLabel>Name your poll.</ControlLabel>
                  <FormControl
                    name="question"
                    type="text"
                    placeholder="What is your favorite soda?"
                    value={this.state.question}
                    onChange={this.handelInputChange}
                  />
                </FormGroup>
                <ControlLabel>Options</ControlLabel>
                <FormControl
                  name="answer1"
                  type="text"
                  placeholder="Pepsi"
                  value={this.state.answer1}
                  onChange={this.handelInputChange}
                />
                <FormControl
                  name="answer2"
                  type="text"
                  placeholder="Coke"
                  value={this.state.answer2}
                  onChange={this.handelInputChange}
                />
                {this.state.additionalAnswers.map((val, index) => answer(val, index, this.handelInputChange))}
              </form>
              <Button onClick={this.addAnswers}>
                More answers
              </Button>
              <br />
              <Button bsStyle="success" className="newPoll_submitBtn">
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(NewPoll);
