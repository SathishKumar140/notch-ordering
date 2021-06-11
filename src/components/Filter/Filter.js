import React, { useRef } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { DROPDOWN } from '../../constant';
import "./Filter.scss";

const DropdownWrapper = (props) => {
    const { select } = props;
    const ref = useRef(null);
    if(select && ref.current){
        ref.current.selectItem(select)
    }
    return <Dropdown ref={ref} {...props} />
}

const FilterList = ({list = []}) => {
    return Array.isArray(list) && list.map(({name, type, placeholder, options, cb, wrapperStyle = {}, isMulti = false, listItemStyle, ...rest}) => {
        switch(type){
            case DROPDOWN: {
                return <DropdownWrapper
                    name={name}
                    title={placeholder}
                    list={options}
                    onChange={cb}
                    styles={{
                        wrapper: wrapperStyle,
                        listItem: listItemStyle
                    }}
                    {...rest}
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