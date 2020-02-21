import React from 'react'
export function SelectClass (props) {
    let items = ['Все', '10А', '10Б', '10В', '11А', '11Б', '11В',];
    const selects = items.map((el, key) => <option key={key}>{el}</option>);
    return <select onChange={props.handleSelectChange}>{selects}</select>
}
export function SelectType (props) {
    let items = ['Все', 'Семистровки', 'Семинары'];
    const selects = items.map((el, key) => <option key={key}>{el}</option>);
    return <select onChange={props.handleSelectChange}>{selects}</select>
}