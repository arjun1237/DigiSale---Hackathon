import React from 'react'
import styles from '../styles/Sidebar.module.css'
import {DataContext} from '../Context/DataContextProvoder'
import {display} from '../data/common'


export default class SearchContact extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            search: ''
        }
    }

    filterContacts = () => {
        let s = this.state.search.toLowerCase()
        return this.context.contacts.filter(person => 
                                (person.name && person.name.toLowerCase().startsWith(s)) || 
                                (person.phone && person.phone.toLowerCase().startsWith(s)) )
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        let {contacts} = this.context

        if(this.state.search.trim().length > 0){
            contacts = this.filterContacts()
        }
        let select = this.context.customerSelect
        let {changeDisplay} = this.context
        return(        
            <div className={styles.searchContact}>
                <div>
                    <div>
                        <input type="text" className={styles.searchBar} placeholder="Search for Customer" value={this.state.search} name="search" onChange={this.handleChange} />
                    </div>
                    <button onClick={() => changeDisplay(display.contactCreate)} className={styles.contactbutton}>CREATE CONTACT</button>
                    <div>
                        {contacts.length > 0 && contacts.map( cn =>
                            <div className={select === cn.id ? styles.selectContact: styles.contact} key={cn.id} onClick={() => this.context.selectCustomer(cn.id)}>
                                <p>{cn.title} {cn.name}</p>
                                <p>{cn.phone}</p>
                                <p>{cn.email}</p>
                            </div>
                        )}  
                    </div>
                </div>
            </div>
        )
    }

}

SearchContact.contextType = DataContext