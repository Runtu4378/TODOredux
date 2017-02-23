import React, { Component, PropTypes } from 'React';
import Lists from './lists';
import Details from './details';

export default class HeaderCon extends Component {
    static propTypes = {
        win: PropTypes.string,
        lists: PropTypes.array,
        actions: PropTypes.object.isRequired,
        edit: PropTypes.object
    }

    render(){
        let {win, lists, edit, actions} = this.props;
        if(win == 'lists'){
            return (
                <Lists lists={lists} actions={actions}></Lists>
            )
        }else{
            return(
                <Details edit={edit} actions={actions}></Details>
            )
        }
    }
}