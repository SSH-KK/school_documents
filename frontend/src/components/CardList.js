import React, {Component} from 'react'
import Card from './Card'

class CardList extends Component {
	render () {
		const list = this.props.data.length != 0 ? (this.props.data.map( (el, key) => {
			return <Card key={key} id={key} data={el} />
		})) : "Nothing found";
		return(
			<div>
				{list}
			</div>
		);
	}
}
export default CardList;