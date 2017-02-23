import {ADD_LIST, DEL_LIST, ADD_DETAIL, FIN_DETAIL, DEL_DETAIL} from '../constants/ActionTypes'

let combine = (state, actions) => {
    return state.map((item) => {
        return{
            id: item.id,
            title: item.title,
            unFinNum: deal_unFinNum(item.id, item.unFinNum, actions),
            detail: item.detail
        }
    });
}

let deal_unFinNum = (list_id, state, actions) => {
    switch(actions.type){
        case ADD_DETAIL:{
            let id = actions.id;
            if(list_id == id){
                return state + 1;
            }else{
                return state;
            }
            break;
        }
        case FIN_DETAIL:{
            let {id, tarid, text} = actions;
            // 设置为已完成
            if(list_id == id){
                return (text == 'done' ? state - 1 : state + 1)
            }else{
                return state
            }
            break;
        }
        case DEL_DETAIL:{
            let {lid, did} = actions;
            // 设置为已完成
            if(list_id == lid){
                return state - 1;
            }else{
                return state
            }
            break;
        }
        default: {
            return state;
        }
    }
}

let cross = (state, actions) => {
    // console.log(actions);
    switch(actions.type){
        case ADD_LIST:{
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    title: actions.text,
                    unFinNum: 0,
                    detail: []
                },
                ...state
            ]
            break;
        }
        case DEL_LIST:{
            let id = actions.id;
            let output = [...state];
            for(let i=0; i<output.length; i++){
                if(state[i].id == id){
                    output.splice(i, 1);
                }
            }
            return output
            break;
        }
        default:{
            return state
        }
    }
}

let dealDetail = (id, state, actions) => {
    switch (actions.type){
        case ADD_DETAIL:{
            let tar_id = actions.id;
            if(tar_id == id){
                let text = actions.text;
                let output = [...state];
                output = [
                    {
                        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                        title: text,
                        fin: 'not'
                    },
                    ...output
                ]
                return output;
            }else{
                return state
            }
        }
        case DEL_DETAIL:{
            let {lid, did} = actions;
            if(lid == id){
                let output = [...state];
                state.forEach((d, indx) => {
                    if(d.id == did){
                        output.splice(indx, 1);
                    }
                });
                return output;
            }else{
                return state
            }
        }
        case FIN_DETAIL:{
            let tar_id = actions.id;
            if(tar_id == id){
                let detaildId = actions.tarid;
                let output = [...state];
                for(let i=0; i<output.length; i++){
                    if(output[i].id == detaildId){
                        output[i].fin = actions.text
                    }
                }
                return output;
            }else{
                return state
            }
        }
        default:{
            return state;
        }
    }
}

const normalVal = []

let lists = (state = normalVal, actions) => {
    let tempstate = combine(state, actions),
        finalstate = cross(tempstate, actions);
    // 将lists的detail项分配给dealDetail函数处理
    finalstate = finalstate.map((item) => {
        let newItem = item;
        newItem.detail = dealDetail(item.id, item.detail, actions);
        return newItem;
    })
    return finalstate;
}

export default lists;