import React, {Component} from 'react'
import Card from './Card'

class CardList extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		const list = this.props.data.map( (el, key) => {
			return <Card key={key} id={key} data={el} />
		});
		return(
			<div>
				{this.props.data ? list : "Nothing found"}
			</div>
		);
	}
}
export default CardList;