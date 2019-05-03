import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRepos, toggleProgress } from '../actions/repoActions';
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#00C851",
  },
    shadowBlur: 0,
    barThickness: 4
});

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ owner: event.target.value });
  }

  handleSubmit(event) {
    // Call GET_REPO Action
    this.props.toggleProgress(true);
    this.props.getRepos(this.state.owner, 1);
    event.preventDefault();
  }


  render() {
    return (
      <Form onSubmit={this.handleSubmit} >
        { this.props.progress ? <TopBarProgress/>: '' }
        <Form.Input placeholder='Enter User Name' name='name' value={this.state.owner ? this.state.owner : ''} onChange={this.handleChange} />
        <Form.Button content='Go' style={{ position: 'absolute', top: 8, right: 2, padding: '0.8rem', background: 'white' }} size='small' />
      </Form>
    )
  }
}

PostForm.propTypes = {
  progress: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  progress: state.repos.progress
});

export default connect(mapStateToProps, { getRepos, toggleProgress })(PostForm);