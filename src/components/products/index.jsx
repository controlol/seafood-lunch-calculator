import { Component, Fragment } from 'react'
import XHR from '../../functions/XHR'
import { ListContainer } from '../../styled/List'

import AddProduct from './addProduct'
import Product from './product'

class Products extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  componentDidMount = () => {
    return XHR({
      method: "GET",
      url: "product/list.php"
    })
    .then(response => {
      if (typeof response.data === "object") this.setState({ products: response.data || [] })
    })
    .catch(err => {})
  }

  addProduct = product => {
    let products = this.state.products
    products.unshift(Object.assign({ id: this.state.products[0]?.id + 1 || 1 }, product))
    this.setState({ products })
  }

  render() {
    const { products } = this.state

    return (
      <Fragment>
        <AddProduct addProduct={this.addProduct} />

        <ListContainer>
          {
            products.length ?
              products.map(v => <Product key={"product_" + v.id} info={v} />)
              :
              <h1 style={{ textAlign: "center", fontWeight: 300 }}> Add a product first </h1>
          }
        </ListContainer>
      </Fragment>
    )
  }
}

export default Products