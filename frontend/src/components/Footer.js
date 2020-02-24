import React from 'react'
import { WaveTopBottomLoading } from 'react-loadingg';

export default function Footer (props) {
    return (
        <footer>
            <div className={`topNotch ${props.isLoading && 'expandedFooter'}`} />
            <div className="loading" hidden={!props.isLoading}>
                <WaveTopBottomLoading style={{
                    position: 'relative',
                    margin: 'auto',
                }} color="#fff" />
            </div>
            <h1>✌️</h1>
            <p> Prod. by Dima & Artemka</p>
        </footer>
    )
}