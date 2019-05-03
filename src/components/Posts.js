import React, { Component } from 'react'
import { List, Button, Segment, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import moment from 'moment'
import { connect } from 'react-redux';
import { getRepos, showModal, toggleProgress} from '../actions/repoActions';
import Charts from './chart';

class Posts extends Component {
  handleClick = () => {
    // Call Action
    this.props.toggleProgress(true);   
    this.props.getRepos(this.props.owner, this.props.next);
  }
  componentWillReceiveProps(nextProps){
    this.props.toggleProgress(false);
    // console.log('new props came ...');
  }
  show(name){
    // Call SHOW_MODAL Action ...
    this.props.toggleProgress(true);
    this.props.showModal(name, this.props.owner);
  }

  render() {
    const postItems = this.props.repos.map(repo => (
      <List.Item key={ repo.id }>
        <List.Icon name='github' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header as='a' onClick={() => this.show(repo.name)}>{ repo.name }</List.Header>
          <List.Description as='label'>Updated: { moment(repo.updated_at).fromNow() }</List.Description>
        </List.Content>
      </List.Item>
    ));
    return (
      <Segment className="repos" style={{ padding: '2rem', margin: 'auto' }}>
        <List animated verticalAlign='middle' divided relaxed >
          { postItems.length > 0 ? postItems: <div><Icon name='github' size='massive' /><h3>Git Test App</h3></div> }
        </List>
        <br/>
        {this.props.next && this.props.next !== 1 ? <Button color='green' compact onClick={ () =>{ this.handleClick() } }> Load More </Button> : ''}
        <Charts/>
      </Segment>
    )
  }
}

Posts.propTypes = {
  showModal: PropTypes.func.isRequired,
  getRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  owner: PropTypes.string,
  next: PropTypes.number,
}

const mapStateToProps = state => ({
  repos: state.repos.repos,
  owner: state.repos.owner,
  next: state.repos.next,
});

export default connect(mapStateToProps, { getRepos, showModal, toggleProgress})(Posts);