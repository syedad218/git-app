import React, { Component } from 'react'
import axios from 'axios';
import { Divider, List, Button, Segment, Modal, Form } from 'semantic-ui-react'
import ReactEcharts from 'echarts-for-react';
import moment from 'moment'

class Posts extends Component {
  constructor (props){
    super(props);
    this.state = {
      repos: [],
      owner: '',
      next: 1,
      open: false,
      chart_data: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillMount(){
    //
  }

  handleClick = () => {
    // console.log(`https://api.github.com/users/defunkt/repos?page=${this.state.next}`);

    axios.get(`https://api.github.com/users/${this.state.owner}/repos?page=${this.state.next}`, {
      headers: {
        "Authorization": "token 9a37a3f3b8dc5c6af8cae986c338aea042e6cd84"
      }
    })
    .then((res) => {
      this.setState({ repos: this.state.repos.concat(res.data) });

      var patt = new RegExp('rel="next"');

      if (res.headers.link && patt.test(res.headers.link)){
        console.log(res.headers.link);
        this.setState({ next: this.state.next + 1 });
      }
      else{
        this.setState({ next: null });
      }

    }).catch((error) => {
      console.log(error);
    });
  }

  show(name){
    // console.log(name);
    axios.get(`https://api.github.com/repos/${this.state.owner}/${name}/stats/participation`, {
      headers: {
        "Authorization": "token 9a37a3f3b8dc5c6af8cae986c338aea042e6cd84"
      }
    })
    .then((res) => {
      console.log(res.data);
      res.data["all"] = res.data["all"].reverse().slice(0,10);
      res.data["owner"] = res.data["owner"].reverse().slice(0,10);
      this.setState({ chart_data: res.data });
      this.setState({ open: true });

    }).catch((error) => {
      console.log(error);
    });
  }

  close = () => this.setState({ open: false })

  getOption = () => {
    if (this.state.chart_data){
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              crossStyle: {
                  color: '#999'
              }
          }
      },
        legend: {
          data:['owner','others','all']
      },
      xAxis: [
          {
              name: 'Weeks',
              type: 'category',
              data: ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'],
              axisPointer: {
                  type: 'shadow'
              }
          }
      ],
      yAxis: [
          {
              type: 'value',
              name: 'Commits',
              min: 0,
              max: Math.max.apply(null, this.state.chart_data["all"]) + 5,
              interval: 15,
              axisLabel: {
                  formatter: '{value}'
              }
          }
      ],
      series: [
          {
              name:'owner',
              type:'bar',
              data: this.state.chart_data["owner"]
          },
          {
              name:'others',
              type:'bar',
              data: this.state.chart_data["all"].map( (item,index) => { return item - this.state.chart_data["owner"][index] } )
          },
          {
              name:'all',
              type:'line',
              yAxisIndex: 0,
              data: this.state.chart_data["all"]
          }
        ]
      };
      return option;
    }
    else{
      return {}
    }
  }

  handleSubmit = () => {
    // console.log("Not Implemented ... ");
    console.log(this.state.owner);
    this.setState({ next: 1, repos: []});

    axios.get(`https://api.github.com/users/${this.state.owner}/repos?page=${this.state.next}`, {
      headers: {
        "Authorization": "token 9a37a3f3b8dc5c6af8cae986c338aea042e6cd84"
      }
    })
    .then((res) => {
      this.setState({ repos: this.state.repos.concat(res.data) });

      var patt = new RegExp('rel="next"');

      if (res.headers.link && patt.test(res.headers.link)){
        console.log(res.headers.link);
        this.setState({ next: this.state.next + 1 });
      }
      else{
        this.setState({ next: null });
      }

    }).catch((error) => {
      console.log(error);
    });

  }

  handleChange(event) {
    this.setState({owner: event.target.value});
    // console.log(event.target.value)
  }

// Github-Token: 9a37a3f3b8dc5c6af8cae986c338aea042e6cd84 
// curl -i -H "Authorization: token 5199831f4dd3b79e7c5b7e0ebe75d67aa66e79d4" \
// https://api.github.com/user

  render() {
    const postItems = this.state.repos.map(repo => (
      <List.Item key={ repo.id }>
        {/* <List.Icon name='github' size='small' verticalAlign='middle' /> */}
        <List.Content>
          <List.Header as='a' onClick={() => this.show(repo.name)} >{ repo.name }</List.Header>
          <List.Description as='label' style={{ fontSize: '10px' }}>updated: { moment(repo.updated_at).fromNow() }</List.Description>
        </List.Content>
      </List.Item>
    ));
    // console.log(postItems);
    return (
      <div>
      <Form onSubmit={ () => this.handleSubmit() }>
            <Form.Input placeholder='Type User Name' name='name' value={this.state.owner} onChange={ this.handleChange } style={{ border: '3px solid #4285F4', borderRadius: '5px', padding: '0.3rem' }} />
            <Form.Button content='Go' style={{ position: 'absolute', top: 8, right: 2, padding: '0.8rem', background: 'white', border: '1px solid #4285F4' }} size='small' />
      </Form>
      
      <Segment className="repos" style={{ padding: '2rem', minWidth: '23em',margin: 'auto' }}>
        <List animated verticalAlign='middle' relaxed='very'>
          { postItems.length > 0 ? postItems: <h4> No Details Available !!! </h4> }
        </List>
        <Divider horizontal></Divider>

        {this.state.next && this.state.next !== 1 ? <Button color='green' compact onClick={ () =>{ this.handleClick() } }>Load More</Button> : ''}
        
        <Modal open={this.state.open} centered={true} onClose={this.close} size='small' closeIcon>
          <Modal.Header>Commit Count For Past 10 weeks</Modal.Header>
          <Modal.Content>
            <Modal.Description>
            
            <ReactEcharts
              option={this.getOption()}
              notMerge={true}
              lazyUpdate={true}
              />

            </Modal.Description>
          </Modal.Content>
        </Modal>

      </Segment>
      </div>
    )
  }
}

export default Posts;