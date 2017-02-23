import {CHANGE_WIN} from '../constants/ActionTypes'

// lsits, details,
const normalDetail = 'lists';

let win = (state = normalDetail, actions) => {
    switch(actions.type){
        case CHANGE_WIN:
            return actions.now
            break;
        default:
            return state;
    }
}

export default win;