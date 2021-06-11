import React from 'react';
import { Dropdown, DropdownMultiple } from 'reactjs-dropdown-component';
import { DROPDOWN } from '../../constant';
import "./Filter.scss";

const FilterList = ({list = []}) => {
    return Array.isArray(list) && list.map(({name, type, placeholder, options, cb, wrapperStyle = {}, isMulti = false, listItemStyle}) => {
        switch(type){
            case DROPDOWN: {
                const DropdownComp = isMulti ? DropdownMultiple : Dropdown
                return <DropdownComp
                    name={name}
                    title={placeholder}
                    list={options}
                    onChange={cb}
                    styles={{
                        wrapper: wrapperStyle,
                        listItem: listItemStyle
                    }}
                />
            }
            default: {
                return <></>
            }
        }
    })
}

const Filter = (props) => {
    const { onResetClick } = props;
    return <section className="filter-container">
        <FilterList {...props}/>
        <button onClick={onResetClick}>
            <i className="fa fa-times"></i>
            <span>Reset Filters</span> 
        </button>
    </section>
}

export default Filter;