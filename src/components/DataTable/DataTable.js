import React from 'react';
import './DataTable.scss';

export default class DataTable extends React.Component{

    renderHeader() {
        const { columns } = this.props;
        
        if(!Array.isArray(columns)){
            return <tr/>
        }

        const columnTags = columns.map(({display}, i) => {
            return <th key={i}>{display}</th>
        })
        return <tr>{columnTags}</tr>;
    }

    renderRows() {
        const { columns, rows } = this.props;

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

        return rows.map(row => {
            const values = columns.map((({key, ...rest }, i) => <td key={i} data-label={key}>
                {renderValue(row, {...rest, key})}
            </td>))
            return <tr>{values}</tr>
        })
    }

    render() {
        return <table className="table">
            <thead>{this.renderHeader()}</thead>
            <tbody>{this.renderRows()}</tbody>
        </table>
    }
}