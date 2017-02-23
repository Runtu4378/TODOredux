import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as TodoActions from '../actions/index';
import Win from '../components/win.jsx';

const App = ({state, actions}) => (
    <Win lists={state.lists} edit={state.edit} win={state.win} actions={actions}></Win>
)

App.propTypes = {
    state: PropTypes.object
}

const mapStateToProps = state => ({
    state: state
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)