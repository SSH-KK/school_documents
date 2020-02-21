import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound (props) {
    return (
        <div>
            <h1>404</h1>
            <h2>{props.error}</h2>
            <Link to="/r">Вернуться на главную</Link>
        </div>
    )
} 