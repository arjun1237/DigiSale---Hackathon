import React from 'react'
import styles from '../styles/Sidebar.module.css'
import {DataContext} from '../Context/DataContextProvoder'
import {display} from '../data/common'


export default class SidebarList extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        const {changeDisplay} = this.context
        return(        
            <div className={styles.list}>
                <ul>
                    <li onClick={() => changeDisplay(display.contactCreate)}>Create Contact</li>
                    <li onClick={() => changeDisplay(display.products)}>View Products</li>
                    <li onClick={() => changeDisplay(display.bill)}>Go To Billing</li>
                </ul>
            </div>
        )
    }
}

SidebarList.contextType = DataContext