import { Select } from '@material-ui/core'
import React from 'react'
import styles from '../styles/CreateContact.module.css'
import {DataContext} from '../Context/DataContextProvoder'

export default class CreateContact extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            title: "Mr",
            name: "",
            mob: "",
            email: ""
        }
        
    }

    handleInputs = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.context.createContact({...this.state})
    }

    render(){
        return (
            <div>
                <h1 className={styles.heading}>Create a new Contact</h1>
                <form onSubmit={this.handleSubmit}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <select value={this.state.title} name="title" placeholder="Select Title" onChange={this.handleInputs}>
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Mrs">Mrs</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input value={this.state.name} name="name" type="text" onChange={this.handleInputs}/> </td>
                            </tr>
                            <tr>
                                <td>Mobile</td>
                                <td><input value={this.state.mob} name="mob" type="number" onChange={this.handleInputs}/> </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><input value={this.state.email} name="email" type="email" onChange={this.handleInputs}/> </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button>SUBMIT</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}


CreateContact.contextType = DataContext