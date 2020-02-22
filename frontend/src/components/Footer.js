import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 25vh;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(54, 54, 69);
    padding-top: 20px;
    color: white;
`
const WhiteBlock = styled.div`
    position: absolute;
    background: #fff;
    width: 100%;
    top: 0;
    border-radius: 0 0 20px 20px;
    height: 20px;
`

export default function Footer () {
    return (
        <StyledFooter>
            <WhiteBlock></WhiteBlock>
            <h1>✌️</h1>
            <p> Prod. by Dima & Artemka</p>
        </StyledFooter>
    )
}