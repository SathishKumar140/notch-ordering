import React from 'react';
import { paginate, sortArrayOfObjects } from './Helper';
import { PREV, NEXT, SORT_ORDERS } from '../../constant';

import './DataTable.scss';

export default class DataTable extends React.Component{

    state = {
        ...paginate(0),
        sortColumn: '',
        sortOrder: SORT_ORDERS.NONE,
        mRows: []
    }

    componentDidMount(){
       this.setPaginationDataState()
    }

    componentDidUpdate(prevProps){
        const { rows: prevRows = []} = prevProps;
        const { rows = [] } = this.props;
        if(prevRows !== rows){
            this.setPaginationDataState();
        }
    }

    setPaginationDataState = () => {
        const { rows = [], pageSize = 10 } = this.props;
        this.setState({...paginate(rows.length, 1, pageSize), mRows: [...rows]})
    }

    onColumnClick = key => () => {
        const { rows } = this.props; 
        const { sortOrder, sortColumn } = this.state;
        const getSortOrder = () => {
            if((sortColumn === key || sortColumn === '') && sortOrder === SORT_ORDERS.NONE ){
                return SORT_ORDERS.ASC
            }else if(sortColumn !== key && sortOrder !== SORT_ORDERS.NONE ){
                return SORT_ORDERS.ASC
            }else if(sortColumn === key && sortOrder === SORT_ORDERS.ASC){
                return SORT_ORDERS.DESC
            }else{
                return SORT_ORDERS.NONE
            }
        }
        const order  = getSortOrder();
        const mRows = order !== SORT_ORDERS.NONE ? sortArrayOfObjects([...rows], key, order) : [...rows];
        this.setState({
            sortColumn: key,
            sortOrder: order,
            mRows
        })
    }

    renderHeader() {
        const { columns } = this.props;
        const { sortColumn, sortOrder } = this.state;
        if(!Array.isArray(columns)){
            return <tr/>
        }

        const columnTags = columns.map(({key, display, sort}) => {
            const isIconRequired = sortColumn === key && sortOrder !==  SORT_ORDERS.NONE;
            const className = sortOrder === SORT_ORDERS.ASC ? 'fa fa-arrow-down' : 'fa fa-arrow-up';
            if(sort){
                return <th className="sort" key={key} onClick={this.onColumnClick(key)}>
                    <span>{display}</span>
                    {isIconRequired && <i className={className}></i> }
                </th>
            }
            return <th key={key}>{display}</th>
        })
        return <tr>{columnTags}</tr>;
    }

    renderRows() {
        const { columns } = this.props;
        const { startIndex, endIndex, mRows: rows } = this.state;
        
        if(!Array.isArray(columns) && !Array.isArray(rows)){
            return <tr/>
        }

        const renderValue = (row, column) => {
            const { component: Component, key, selector } = column;
            if(Component){
                return <Component data={row}/>
            }else if(selector){
                return selector(row);
            }else{
                return row[key]
            }
        }

        return [...rows].slice(startIndex, endIndex + 1).map(row => {
            const values = columns.map((({key, display, ...rest }, i) => <td key={i} data-label={display}>
                {renderValue(row, {...rest, key})}
            </td>))
            return <tr>{values}</tr>
        })
    }

    onPageChange = action => () => {
        const { rows, pageSize = 10 } = this.props;
        const { currentPage } = this.state;
        let page = currentPage
        if(action === PREV){
            page -= 1;
        }else{
            page += 1;
        }

        this.setState({...paginate(rows.length, page, pageSize)})
    }

    render() {
        const { rows = [] } = this.props;
        const { currentPage, startPage, endPage } = this.state;
        const noData = !rows.length;
        console.log(currentPage, startPage, endPage, currentPage !== startPage && !noData)
        return <>
            <table className="table">
                <thead>{this.renderHeader()}</thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
            {noData && <div className="no-rows">No rows to display</div> }
            <div className="pagination">
                { currentPage !== startPage && !noData && <i className="fa fa-chevron-left" onClick={this.onPageChange(PREV)}></i> }
                <span>Page: {currentPage}</span>
                { currentPage !== endPage && <i className="fa fa-chevron-right" onClick={this.onPageChange(NEXT)}></i> }
            </div>
        </>
    }
}