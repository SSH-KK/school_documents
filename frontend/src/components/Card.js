import React from 'react'
import { Link } from 'react-router-dom'

function Card (props) {
    const {src, date, title, type, classNum } = props.data;
    return (
        <Link className="card" to={"/r/seminar/" + props.id}>
            <img title={date} src={src} alt={title} />
            <div className="shade">
                <h1>{title} <span className="indicationDot" >&#9679;</span></h1>
                <p>{classNum}</p>
                <span>{date}</span>
            </div>
        </Link>
    );
}
export default Card;