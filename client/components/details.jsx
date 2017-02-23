import React, { Component, PropTypes } from 'React';

export default class Details extends Component {
    static propTypes = {
        edit: PropTypes.object,
        actions: PropTypes.object
    }

    state = {
        tabTxt: '显示已完成任务',
        showFin: true
    }

    handleBack(){
        this.props.actions.changeWin('lists');
        this.props.actions.changeEditing({});
    }

    fiterDetail(arr, type, show){
        return arr.map(list => {
            if(list.fin == type){
                return (
                    <li key={list.id} className={ (list.fin == 'done' ? (show ? "list-item done show":"list-item done") : "list-item ")} onClick={() => this.handleFinDetail(list.id, list.fin)}>
                        <div className="list-icon">
                            <span className={ list.fin == 'done' ? "iconfont icon-checkbox1" : "iconfont icon-checkbox"}></span>
                        </div>
                        <div className="list-tit">{list.title}</div>
                        <div className="list-set">
                            <span className="iconfont icon-garbage" onClick={(e) => this.handleDel(e, list.id, list.title)}></span>
                        </div>
                    </li>
                )
            }
        })
    }

    handleDel = (e, did, tit) => {
        e.stopPropagation();
        let lid = this.props.edit.id;
        let that = this;
        layer.msg('确定要删除任务：'+ tit +'么?', {
            time: 0,
            btn: ['确认', '取消'],
            yes:function(index){
                layer.close(index);
                that.props.actions.delDetail(lid, did);
            }
        });
    }

    handleFinDetail(id, now){
        let liId = this.props.edit.id;
        this.props.actions.finDetail(liId, id, now == 'done'? 'not':'done');
    }

    handleAddDetail(e){
        if(e.key == 'Enter'){
            let tar = this.refs.detailInput;
            let value = tar.value;
            value = value.replace(/(^\s*)|(\s*$)/g, "");
            if(value == ''){
                layer.msg('您还没有输入任务名称！')
            }else{
                this.props.actions.addDetail(this.props.edit.id, value);
                this.refs.detailInput.value = '';
            }
        }
    }

    handleShowDetail(){
        let {tabTxt, showFin} = this.state;
        let {unFinNum} = this.props.edit;
        if(unFinNum > 0){
            this.setState({
                showFin: !showFin,
                tabTxt: (showFin ? '显示已完成任务' : '隐藏已完成任务')
            })
        }
    }

    render(){
        let detail = '';
        let edit = this.props.edit;
        let {unFinNum, title} = edit;
        let {tabTxt, showFin} = this.state;
        return (
            <div id="root">
                <header>
                    <div className="item item-left back iconfont icon-back" onClick={() => this.handleBack()}></div>
                    <div className="item item-middle title">{title}</div>
                </header>
                <div id="site_body">
                    <div className="list-detail-con">
                        <ul className="detail-outside">
                            <li className="list-item add-detail-con">
                                <div className="list-icon">
                                    <span className="iconfont icon-add"></span>
                                </div>
                                <div className="list-tit">
                                    <input type="text" placeholder="添加任务..." onKeyPress={(e) => this.handleAddDetail(e)} ref="detailInput"/>
                                </div>
                            </li>
                            {this.fiterDetail(edit.detail, 'not', showFin)}
                            {(unFinNum > 0 && unFinNum != edit.detail.length) ? <div className="show-detail-tab" onClick={() => this.handleShowDetail()}>{tabTxt}</div> : ''}
                            {this.fiterDetail(edit.detail, 'done', showFin)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}