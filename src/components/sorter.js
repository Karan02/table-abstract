import React from "react"
import {Icon} from "antd"
class Sorter extends React.Component{

  handleUpper=()=>{
    
    this.props.handleSort("des",this.props.index)
  }
  handleDown=()=>{
    
    this.props.handleSort("asc",this.props.index)
  }
  render(){

    return(
      <div>
        
        <div><button onClick={this.handleUpper} className={this.props.index}><Icon type="arrow-up" /></button>
            <button  onClick={this.handleDown} className={this.props.index}><Icon type="arrow-down" /></button></div>
      </div>
    );
  }

}
export default Sorter