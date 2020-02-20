import React from 'react'
import { Link } from 'react-router-dom'

function SingleSeminar (props) {
    const {src, date, class_num, title, type } = props.data;
    return (
        <div>
            <img src={src} alt={title} />
            <h1>{title}</h1>
            <span>{date}</span>
            <p>{class_num} - {type == "Семинаы" ? "семинар" : "Семестровые задачи"}</p>
        </div>
    );
}
export default SingleSeminar;