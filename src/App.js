import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from './components/Header';
import DataTable from './components/DataTable';
import { fetchOrders } from './actions';
import { cols } from './config';
import './App.scss';

class App extends React.Component {

  componentDidMount(){
    this.props.fetchOrders()  
  }

  render() {
    const { orderList } = this.props;
    return (
      <section>
        <Header/>
        <DataTable columns={cols} rows={orderList}/>
      </section>
    );
  }
}

export default connect(
  ({ orderList }) => ({ orderList }),
  (dispatch) =>
      bindActionCreators(
          {
            fetchOrders
          },
          dispatch
      )
)(App);
