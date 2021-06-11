import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from './components/Header';
import Filter from './components/Filter';
import DataTable from './components/DataTable';
import { fetchOrders, resetFilters, setSelectedFilter } from './actions';
import { cols, filters } from './config';
import { ALL_STATUS, ALL_SUPPLIERS, STATUS, SUPPLIER } from './constant';
import './App.scss';

class App extends React.Component {

  componentDidMount(){
    this.props.fetchOrders();
  }

  onOptionSelect = key => (option) => {
    const { selectedFilters } = this.props;
    const { value } = option;
    if(value === ALL_SUPPLIERS || value === ALL_STATUS){
      const { [key]: selectedKey, ...rest} = selectedFilters;
      if(!Object.keys(rest).length){
        this.props.resetFilters()
      }else{
        this.props.setSelectedFilter({...rest})
      }
    }else{
      this.props.setSelectedFilter({...selectedFilters, [key]: value })
    }
  }

  onResetClick = () => this.props.resetFilters();

  render() {
    const { orderList, supplierOptions = [], statusOptions = [], selectedFilters } = this.props;
    const modifiedFilterConfig = filters.map(({name, ...rest}) => {
      switch(name){
        case SUPPLIER:{
          const selectValue = selectedFilters['vendorName'] || ALL_SUPPLIERS;
          return { 
            ...rest, 
            cb: this.onOptionSelect('vendorName'), 
            options: supplierOptions,
            ...(supplierOptions.length ? { select: {value: selectValue, label : selectValue } } : {})
          }
        }
        case STATUS:{
          const selectValue = selectedFilters['orderBuyerStatus'] || ALL_STATUS;
          return { 
            ...rest, 
            cb: this.onOptionSelect('orderBuyerStatus'), 
            options: statusOptions,
            ...(statusOptions.length ? { select: {value: selectValue, label : selectValue } } : {})
          }
        }
        default: {
          return {name, ...rest}
        }
      }
    })
    return (
      <section>
        <Header/>
        <section className="filter-bg">
          <section className="container">
            <Filter list={modifiedFilterConfig} onResetClick={this.onResetClick}/>
          </section>
        </section>
        <section className="table-bg">
          <section className="container">
            <DataTable columns={cols} rows={orderList}/>
          </section>
        </section>
      </section>
    );
  }
}

export default connect(
  ({ filteredList, selectedFilters, supplierOptions, statusOptions }) => (
    { 
      orderList: filteredList, 
      selectedFilters, 
      supplierOptions, 
      statusOptions
    }
  ),
  (dispatch) =>
      bindActionCreators(
          {
            fetchOrders,
            resetFilters,
            setSelectedFilter
          },
          dispatch
      )
)(App);
