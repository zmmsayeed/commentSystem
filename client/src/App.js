import React from 'react';

import { connect } from 'react-redux';

import commentReducer from './reducers/commentReducer';

import Main from './components/Main'

class App extends React.Component {
  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // propsToCallApi: (data) => {
    //   return dispatch(callApi(data)) // this function will come from action file
    // }
  };
}
App = connect(
  (state, action) => (
    commentReducer(state, action)),
  mapDispatchToProps,
)(App);


export default App;
