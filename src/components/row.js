import React from "react";
import Cell from "./cell"

class Row extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            isInput: false,
            id:this.props.id,
            
        }
    }
  
    // componentDidMount() {
    //     document.addEventListener("click", this.handleClickOutside);
    // }
    // componentWillUnmount() {
    //   document.removeEventListener("click", this.handleClickOutside);
    // }
    // handleClickOutside = (event) => {
        
    //     if(this.node.contains(event.target)) {  return}
    //     else{     
            
    //         this.setState({isInput:!this.setState.isInput})
    //       }
    //   };
    togglePopupOk = () => {  
        this.setState({  
             isInput: !this.state.isInput  
        });  
        this.props.fireblur(false)
     } 
     togglePopupEdit = () => {  
      this.setState({  
           isInput: !this.state.isInput  
      });  
      this.props.fireblur(true)
   }   

    handleCell=(row)=>{
        const rowKeys = Object.keys(row);
        const rowIndex = this.props.id;
        const onProductTableUpdate = this.props.onProductTableUpdate
        const isInput = this.state.isInput
        
        let cells = Object.keys(row).map(function(cell,index){
            return  <Cell onProductTableUpdate={onProductTableUpdate} 
            rowIndex={rowIndex}  
            id={rowKeys[index]} 
            isInput={isInput}
            // key={row[cell]} 
            value={row[cell]} /> 
        })
        return cells
        
    }
    handleDelete = () =>{
        this.props.handleDelete(this.props.row)
        if(this.state.isInput){
          this.props.fireblur(false)
        }
        this.setState({isInput: false})
    }
    // handleEdit =(index) =>{
    //     console.log(this.props)
    //     // this.props.handleEdit(this.props.key)
    // }
    
    

    handleEditOk(){
        if(this.state.isInput){
          
            return <button className="buttons" onClick={this.togglePopupOk}>ok</button>
        }
        else{
            return <button className="buttons"  onClick={this.togglePopupEdit}>Edit</button>   
        }
    }

    render(){
      
        return(
            <tr className="eachRow" className={this.state.isInput ? 'activerow' : ''}>
                {this.handleCell(this.props.row)}
                {<td>
                    <button onClick={this.handleDelete}>Delete</button>
                    {/* <button onClick={this.handleEdit}>Edit</button> */}
                    {/* { this.state.isInput ? <button className="buttons" onClick={this.togglePopup}>ok</button>:<button className="buttons" onClick={this.togglePopup}>Edit</button>} */}
                    {this.handleEditOk()}
                </td>}
            </tr>
        );
    }

}
export default Row