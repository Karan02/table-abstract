import React from "react";

class Cell extends React.Component{

    render(){
       
        return(
            
             this.props.isInput ? 
             <td className="inputs">
            <input type="text" 
             value={this.props.value} 
             name={this.props.id} 
             id={this.props.rowIndex} 
             onChange={this.props.onProductTableUpdate}
             />
             
             </td>:
             <td>{this.props.value}</td>
            
        );
    }


}
export default Cell