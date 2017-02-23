import React, { Component, PropTypes } from 'React';

export default class lists extends Component {
    static propTypes = {
        lists: PropTypes.array.isRequired,
        actions: PropTypes.object
    }

    state = {
        error: false,
        err_msg: ''
    }

    handleDel(e, id, tit){
        e.stopPropagation();
        let that = this;
        layer.msg('确定要删除清单：'+ tit +'么?', {
            time: 0,
            btn: ['确认', '取消'],
            yes:function(index){
                layer.close(index);
                that.props.actions.delList(id);
            }
        });
    }

    // 打开清单详情
    detailPage(obj){
        this.showDetail(obj.id);
    }

    showDetail(id){
        this.props.actions.changeWin('details');
        this.props.actions.changeEditing(id);
    }

    renderLi(){
        let lists = this.props.lists;
        let con = ''
        return (
            lists.map(list => {
                return (
                    <li key={list.id} onClick={() => this.detailPage(list)} className="list-item" data-id={list.id}>
                        <div className="list-icon">
                            <span className="iconfont icon-list"></span>
                        </div>
                        <div className="list-tit">{list.title}</div>
                        <div className="list-num">{list.unFinNum > 0 ? list.unFinNum : ''}</div>
                        <div className="list-set">
                            <span className="iconfont icon-garbage" onClick={(e) => this.handleDel(e,list.id, list.title)}></span>
                        </div>
                    </li>
                )
            })
        )    
    }

    // 处理输入框输入时点击回车
    handleEnter(e){
        if(e.key == 'Enter'){
            this.onAdd();
        }
    }

    onAdd(){
        let value = this.refs.addInput.value;
        value = value.replace(/(^\s*)|(\s*$)/g, "");
        if(value == ''){
            this.setState({
                error: true,
                err_msg: '您还没有输入清单名称'
            })
            this.hideErrMsg();
        }else{
            this.props.actions.addList(value);
            this.refs.addInput.value = '';
        }
    }

    hideErrMsg(){
        let that = this;
        setTimeout(function(){
            that.setState({
                error: false,
                err_msg: ''
            })
        }, 1800)
    }

    render(){
        let errClass = this.state.error ? "error-msg show" : "error-msg";
        let err_msg = this.state.err_msg;
        let lists = this.props.lists;
        let detail = '';
        // console.log(this.props.lists);
        return (
            <div id="root">
                <header>
                    <div className="item item-middle">
                        <input ref="addInput" className="h36" type="text" placeholder="清单名称..." onKeyPress={(e) => this.handleEnter(e)}/>
                    </div>
                    <div className="item item-right"  onClick={() => this.onAdd()}>Add</div>
                    <div className={errClass}>{err_msg}</div>
                </header>
                <div id="site_body">
                    <div className="list-con">
                        <ul>
                            {this.renderLi()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}