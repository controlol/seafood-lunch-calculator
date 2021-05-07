import { Component, Fragment } from 'react'
import XHR from '../../functions/XHR'
import { ListContainer } from '../../styled/List'
import AddTakeaway from './addTakeaway'
import Takeaway from './takeaway'

class Takeaways extends Component {
  constructor() {
    super()
    this.state = {
      takeaways: []
    }
  }

  componentDidMount = () => {
    return XHR({
      method: "GET",
      url: "takeaway/list.php"
    })
    .then(response => {
      if (typeof response.data === "object") this.setState({ takeaways: response.data || [] })
    })
    .catch(err => {})
  }

  addTakeaway = takeaway => {
    let takeaways = this.state.takeaways
    takeaways.unshift(Object.assign({ id: this.state.takeaways[0]?.id + 1 || 1 }, takeaway))
    this.setState({ takeaways })
  }

  render() {
    const { takeaways } = this.state

    return (
      <Fragment>
        <AddTakeaway addTakeaway={this.addTakeaway} />

        <ListContainer>
          {
            takeaways.length ?
              takeaways.map(v => <Takeaway key={"takeaway_" + v.id} info={v} />)
              :
              <h1 style={{ textAlign: "center", fontWeight: 300 }}> Add a takeaway first </h1>
          }
        </ListContainer>
      </Fragment>
    )
  }
}

export default Takeaways