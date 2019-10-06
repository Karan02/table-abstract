import React from "react"
import Row from "./row"

class Content extends React.Component{

    // constructor(props){
    //     super(props)
    //     this.state={
    //         blur:false
    //     }
    // }
    handleContent(data,columns){
        
        const onProductTableUpdate = this.props.onProductTableUpdate
        const fireblur = this.props.fireblur
        const handleDelete = this.props.handleDelete
        let count=this.props.currentIndex
        let row = data.map(function(row,index){
            count++
            return <Row 
            id={count}
            handleDelete= {handleDelete}
            key={count} 
            row={row}
            onProductTableUpdate={onProductTableUpdate}
            fireblur={fireblur}
            />

        })
        return row
    }
    // fireblur=()=>{
    //     this.setState({blur:true})
    //   } 
    render(){
        return(
            <tbody 
            // className={this.state.blur ? "blur":null}
            >
                {this.handleContent(this.props.data,this.props.columns)}
            </tbody>

        );
    }
}
export default Content;