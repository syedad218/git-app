import { GET_REPO, SHOW_MODAL, CLOSE_MODAL, TOGGLE_PROGRESS } from './types';
import axios from 'axios';

export const getRepos = (owner, nextPage) => dispatch => {

  if (owner) {
    axios.get(`https://api.github.com/users/${owner}/repos?page=${nextPage}&sort=updated`, {
      headers: {
        "Authorization": "token c935aff1cf939502a09307767a63e8e8aece84a8"
      }
    })
    .then((res) => {
      var flag = nextPage !== 1;
      var patt = new RegExp('rel="next"');
      if (res.headers.link && patt.test(res.headers.link)){
        nextPage = nextPage + 1;
      }
      else{
        nextPage = null;
      }
      dispatch({
        type: GET_REPO,
        payload: res.data,
        next_page: nextPage,
        owner: owner,
        flag: flag
      })
    }).catch((error) => {
      console.log(error);
    });
  }
}

export const showModal = (repoName, owner) => dispatch => {

  axios.get(`https://api.github.com/repos/${owner}/${repoName}/stats/participation`, {
      headers: {
        "Authorization": "token c935aff1cf939502a09307767a63e8e8aece84a8"
      }
    })
    .then((res) => {
      res.data["all"] = res.data["all"].reverse().slice(0,10);
      res.data["owner"] = res.data["owner"].reverse().slice(0,10);
      dispatch({
        type: SHOW_MODAL,
        payload: res.data,
        open: true, 
      })
    }).catch((error) => {
      console.log(error);
    });
}

export const closeModal = () => dispatch => {
  dispatch({
    type: CLOSE_MODAL,
    open: false, 
  })
}

export const toggleProgress = (progress) => dispatch => {
  dispatch({
    type: TOGGLE_PROGRESS,
    progress: progress,
  })
}
