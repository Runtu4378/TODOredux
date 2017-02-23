import { combineReducers } from 'redux';
import {ADD_LIST, DEL_LIST, CHANGE_WIN, CHANGE_EDITING} from '../constants/ActionTypes'
import lists from './lists_red';
import win from './win_red';
import crossReducer from './app_red_cross';

const normalEdit = {}

let edit = (state = normalEdit, actions) => {
    switch(actions.type){
        case CHANGE_EDITING:
            return state;
            break;
        default:
            return state;
    }
}

let App = combineReducers({
    win: win,
    lists: lists,
    edit: edit
})

const output = function(state, actions){
    let tempstate = App(state, actions),
        finalstate = crossReducer(tempstate, actions);

    return finalstate;
}

export default output;