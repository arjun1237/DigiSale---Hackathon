import React from 'react'
import styles from '../styles/Products.module.css'
import data from '../data/products.json'
import { render } from '@testing-library/react'
import {DataContext} from '../Context/DataContextProvoder'

export default class Products extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let products = data.products
        const {addProduct, productSelect} = this.context

        return (
            <div className={styles.productContainer}>
                {products && products.map(item => 
                    <ItemSingle item={item} key={item.id} id={item.id} addProduct={addProduct} productSelect={productSelect} />
                )}
            </div>
        )
    }
}

Products.contextType = DataContext



class ItemSingle extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            hover: false
        }
    }
    
    changeHover = (val) => {
        this.setState({
            hover: val
        })
    }

    render(){
        let {item, id, addProduct, productSelect} = this.props
        let selected = productSelect.includes(id)
        return(
            <div className={styles.product} key={item.id} onMouseOver={() => this.changeHover(true)} onMouseLeave={() => this.changeHover(false)}>
                <img src={item.img} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                {(this.state.hover && !selected) &&
                    (<div className={styles.book} onClick={() => addProduct(id) }>
                        <button>ADD TO BILL</button>
                    </div> )
                }
                {selected &&
                    (<div className={styles.book}>
                        <h2>SELECTED</h2>
                    </div> )
                }
            </div>
        )
    }
}