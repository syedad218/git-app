import React, { Component } from 'react'
import { connect } from 'react-redux';
import { closeModal, toggleProgress } from '../actions/repoActions';
import { Modal} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { getOption } from './chartOptions';


class Charts extends Component {

  close = () => this.props.closeModal();

  componentWillReceiveProps(nextProps){
    this.props.toggleProgress(false);
    // console.log('new props came ...');
  }

  render() {
    return (
      <Modal open={this.props.open} centered={true} onClose={this.close} size='small' closeIcon >
        <Modal.Header>Commit Count For Past 10 weeks</Modal.Header>
        <Modal.Content>
        <Modal.Description>

        <ReactEcharts
        option={getOption(this.props.chart_data)}
        notMerge={true}
        lazyUpdate={true}
        />

        </Modal.Description>
        </Modal.Content>
      </Modal>  
    )
  }
}

Charts.propTypes = {
  closeModal: PropTypes.func.isRequired,
  toggleProgress: PropTypes.func.isRequired,
  chart_data: PropTypes.object,
  open: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  chart_data: state.repos.chart_data,
  open: state.repos.open,
});


export default connect(mapStateToProps, { closeModal, toggleProgress })(Charts);

