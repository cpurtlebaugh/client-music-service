import React, { Component } from 'react';
import axios from 'axios';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';


export default class Artist extends Component {
	constructor(props){
		super(props)
		this.state = {
			response: []
		}
		this.getData = this.getData.bind(this);
	}

	async componentDidMount(){	
		let r = await this.getData();
		this.setState({response: r});
	}

	async getData(){
		let response = await axios.get('https://is131tlko9.execute-api.us-west-2.amazonaws.com/dev/music-info');
		return response.data;
	}

  render() {
  	console.log('r: ', this.state.response);
    return (
      <div>
		<DataTable plain>
		    <TableHeader>
		      <TableRow>
		        <TableColumn>Artist</TableColumn>
		        <TableColumn>Followers</TableColumn>
		      </TableRow>
		    </TableHeader>
		    <TableBody>
		      {this.state.response.map((el, i) => (
		        <TableRow key={i}>
		          <TableColumn>{el.name}</TableColumn>
		          <TableColumn>{el.followers.total}</TableColumn>
		        </TableRow>
		      ))}
		    </TableBody>
		  </DataTable>
      </div>
    );
  }
}