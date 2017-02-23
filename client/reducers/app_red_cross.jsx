import {CHANGE_EDITING, ADD_DETAIL, FIN_DETAIL, DEL_DETAIL} from '../constants/ActionTypes'

let crossReducer = (state, actions) => {
    // console.log(state)
    switch (actions.type){
        // 更换edit目标
        case CHANGE_EDITING:{
            let output = {};
            Object.assign(output, state);
            if(typeof actions.now == 'object'){
                output.edit = actions.now
                return output
            }else{
                let now = state.lists;
                let id = actions.now;
                for(let i=0; i<now.length; i++){
                    if(now[i].id == id){
                        output.edit = now[i]
                    }
                }
                return output;
            }
            break;
        }
        // 更新edit目标
        case (ADD_DETAIL):
        case (FIN_DETAIL):
        case (DEL_DETAIL):{
            let output = {};
            Object.assign(output, state);
            let now = state.lists;
            let id = state.edit.id;
            for(let i=0; i<now.length; i++){
                if(now[i].id == id){
                    output.edit = now[i]
                }
            }
            return output;
            break;
        }
        default:
            return state
    }
}

export default crossReducer;