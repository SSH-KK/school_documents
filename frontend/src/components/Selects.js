import React from 'react'

let selectValues = {
    classes: ['Все', '10А', '10Б', '10В', '11А', '11Б', '11В'],
    types: ['Все', 'Семистровки', 'Семинары'],
}
export default function Select (props) {
    let items = props.type == 'classes' ? selectValues.classes : selectValues.types;
    if (!props.showAll) {
        items.shift();
    }
    const selects = items.map((el, key) => <option key={key}>{el}</option>);
    return (
        <select onChange={props.handleSelectChange}>
            {props.children}{selects}
        </select>
    );
}
