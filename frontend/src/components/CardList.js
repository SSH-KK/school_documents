import React from 'react'
import Card from './Card'

function CardList (props) {
	const list = props.data.length != 0 ? (props.data.map( (el, key) => {
		return <Card key={key} id={key} data={el} />
	})) : "Nothing found";
	return(
		<div>
			{list}
		</div>
	);
}
export default CardList;