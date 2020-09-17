import React from 'react'
import styles from '../styles/Billing.module.css'
import {DataContext} from '../Context/DataContextProvoder'
import prodData from '../data/products.json'
import axios from 'axios'
import {postBill} from '../axios/request'
import {v4 as uuid} from 'uuid'

export default class Billing extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            selects: [],
            loading: false,
            paid: false
        }

        this.prodQtys = []
    }

    componentDidMount = () => {
        this.addSelects()
    }

    generateBill = async() => {
        let {products, contacts, customerSelect, productSelect, refreshData} = this.context
        let cust = contacts.find(prsn => prsn.id === customerSelect)
        let [f_name, l_name] = cust.name.trim().split(' ')
        products = products.filter(prod => productSelect.includes(prod.id))
        let total = 0
        products = products.map(prod => {
            let qty = this.state.selects.find(p => p.id === prod.id).qty
            total += prod.price * qty
            return {
                product_id: prod.id,
                quantity: qty,
                price: prod.price,
                product_name: prod.name
            }
        })
        await this.setState({
            loading: true
        })
        await postBill(uuid(), cust.phone, f_name, l_name, cust.email, total, total * 1.18, products)
        await this.setState({
            paid: true,
            loading: false
        })
        refreshData()
    }

    addSelects = () => {
        let {productSelect} = this.context
        let products = prodData.products
        products = products.filter(item => productSelect.includes(item.id))
        products = products.map(item => ({...item, qty: 1}))

        this.setState({
            selects: [...products]
        })
    }



    addUp = (id) => {
        let products = [...this.state.selects]
        products = products.map(item => item.id === id ? {...item, qty: item.qty + 1} : item)

        this.setState({
            selects: [...products]
        })
    }

    reduce = async (id, qty) => {

        if(qty === 1){
            await this.context.deleteProduct(id)

            let products = this.state.selects
            products = products.filter(item => item.id !== id)
            this.setState({
                selects: [...products]
            })
        }
        else{
            let products = [...this.state.selects]

            products = products.map(item => item.id === id ? {...item, qty: item.qty - 1} : item)
    
            this.setState({
                selects: [...products]
            })
        }

    }

    componentDidUpdate = () => {
        console.log(this.context)
    }


    render(){
        let products = this.state.selects
        let total = products.reduce((a, c) => a + c.price * c.qty , 0)
        
        let contact = null
        let customerSelect = this.context.customerSelect
        console.log(customerSelect)
        if(this.context.customerSelect !== -1){
            contact = this.context.contacts.filter(prsn => prsn.id === customerSelect)[0]
        }
        return (
            <div className={styles.billing}>
                <h1 className={styles.heading}>Billing</h1>
                { products.length === 0 ? 
                    
                    <h2>Please select an item to bill</h2> :
                    <div>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 && products.map(item => 
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td className={styles.qty}>
                                            <div>
                                                {item.qty}
                                            </div>
                                            <div>
                                                <span onClick={() => this.addUp(item.id)} ><i className="fa fa-caret-up"></i></span>
                                                <span onClick={() => this.reduce(item.id, item.qty)}><i className="fa fa-caret-down"></i></span>
                                            </div>
                                        </td>
                                        <td>₹{item.price * item.qty}</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='2'>Total</td>
                                    <td>₹{total}</td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>GST</td>
                                    <td>18%</td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>Amount Payable</td>
                                    <td>₹{(total * 1.18).toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                        {!this.state.paid ?
                            <>
                                {customerSelect === -1 ?
                                    <h2 className={styles["mini-head"]}><i className="fa fa-hand-o-left"></i> Please select the customer before payment</h2> 
                                    :
                                    <div style={{display: "flex"}} className={styles["mini-head"]}>
                                        <h2>Thank you for purchasing with us, {contact.title} {contact.name}</h2>
                                        <button className={styles.button} onClick={this.generateBill}>PAY BILL</button>
                                    </div>
                                }
                            </>
                            :
                            <div className={styles.stamp}>
                                <div className={styles.circle}>
                                    <div className={styles.inner}>
                                        <span className={styles.innerText}>PAID</span>
                                    </div>
                                </div>
                            </div>
                        }
                        <>
                            {this.state.loading && 
                                <div className={styles.loading}>
                                    <i className="fa fa-spinner"></i>
                                </div>
                            }
                        </>
                    </div>
                }
            </div>
        )
    }
}


Billing.contextType = DataContext