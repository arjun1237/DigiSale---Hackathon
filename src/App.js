import React from 'react';
import './App.css';
import Billing from './components/Billing';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Products from './components/Products';
import CreateContact from './components/CreateContact';
import {DataContext} from './Context/DataContextProvoder'
import {display} from './data/common'
import styled from 'styled-components'

export default class App extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		
		let res = null
		// console.log(this.context.display)
		switch(this.context.display){
			case display.products:
				res = <Products />
				break
			case display.bill:
				res = <Billing />
				break
			case display.contactCreate:
				res = <CreateContact />
				break
		}

		return (
			<div className="App">
				<Sidebar />
				<Navbar />
				<MainBar>
					{res}
				</MainBar>
			</div>
		)
	}
}

App.contextType = DataContext



const MainBar = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	left: 0;
	top: 0;
	text-align: left;
	margin-left: 600px;
	margin-top: 100px;
	overflow-y: auto;
`