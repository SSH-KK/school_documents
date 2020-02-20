import React from 'react'
import { Link } from 'react-router-dom'

function Card (props) {
    const {src, date, title, type } = props.data;
    return (
        <Link to={"/r/seminar/" + props.id}>
            <img title={date} src={src} alt={title} />
            <h1>{title}</h1>
        </Link>
    );
}
export default Card;