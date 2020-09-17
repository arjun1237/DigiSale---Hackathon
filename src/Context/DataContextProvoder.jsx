import React from 'react'
import data from '../data/products.json'
import {contactData, postContact} from '../axios/request'
import {display} from '../data/common'

const DataContext = React.createContext()


export default class DataContextProvider extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            products: data.products,
            display: display.products,
            contacts: [],
            productSelect: [],
            customerSelect: -1
        }
    }

    refreshData = async() => {
        await this.setState({
            productSelect: [],
            customerSelect: -1
        })
    }

    selectCustomer = (id) => {
        console.log(id)
        this.setState({
            customerSelect: id
        })
    }

    componentDidMount = async () => {
        this.refreshContacts()
    }

    changeDisplay = (payload) => {
        this.setState({
            display: payload
        })
    }

    addProduct = (payload) => {
        this.setState({
            productSelect: [...this.state.productSelect, payload]
        })
    }

    deleteProductFromBill = async (id) => {
        let prods = this.state.productSelect
        prods = prods.filter(item => item !== id)
        await this.setState({
            productSelect: [...prods]
        })
    }

    refreshContacts = async () => {
        this.setState({
            contacts: await contactData()
        }) 
    }

    createContact = async (values) => {
        let res = await postContact(values)
        this.setState({
            contacts: [...this.state.contacts, res]
        })
    }

    render(){
        return (
            <DataContext.Provider value={{...this.state, 
                                    createContact: this.createContact, 
                                    changeDisplay: this.changeDisplay, 
                                    addProduct: this.addProduct, 
                                    deleteProduct: this.deleteProductFromBill,
                                    selectCustomer: this.selectCustomer,
                                    refreshData: this.refreshData}}>

                {this.props.children}

            </DataContext.Provider>
        )
    }
}

export {DataContext}