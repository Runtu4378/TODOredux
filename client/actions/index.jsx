import * as types from '../constants/ActionTypes'

export const addList = text => ({ type: types.ADD_LIST, text })
export const delList = id => ({ type: types.DEL_LIST, id })
export const changeWin = now => ({ type: types.CHANGE_WIN, now })
export const changeEditing = now => ({ type: types.CHANGE_EDITING, now })
export const addDetail = (id, text) => ({type: types.ADD_DETAIL, id, text})
export const finDetail = (id, tarid, text) => ({type: types.FIN_DETAIL, id, tarid, text})
export const delDetail = (lid, did) => ({type: types.DEL_DETAIL, lid, did})