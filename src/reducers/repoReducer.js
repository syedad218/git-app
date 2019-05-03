import { GET_REPO, TOGGLE_PROGRESS, SHOW_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
  repos: [],
  owner: null,
  next: 1,
  open: false,
  chart_data: null,
  progress: false
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_REPO:
      return {
        ...state,
        repos: action.flag ? state.repos.concat(action.payload) : action.payload ,
        next: action.next_page,
        owner: action.owner
      }

    case SHOW_MODAL:
      return {
        ...state,
        chart_data: action.payload,
        open: action.open
      }

    case CLOSE_MODAL:
      return {
        ...state,
        open: action.open
      }

    case TOGGLE_PROGRESS:
      return {
        ...state,
        progress: action.progress
      }

    default:
      return state;
  }
}