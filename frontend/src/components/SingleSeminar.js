import React from 'react'

function SingleSeminar (props) {
    const {src, date, classNum, title, type } = props.data;
    return (
        <div>
            <img src={src} alt={title} />
            <h1>{title}</h1>
            <span>{date}</span>
            <p>{classNum} - {type == "Семинаы" ? "семинар" : "Семестровые задачи"}</p>
        </div>
    );
}
export default SingleSeminar;