import React from "react"
import Row from "./row"
import Pagination from "./pagination"

class Content extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage:1,
            data:this.props.data,
            pageOfItems:[],
            topIndex:0, 
        }
    }
  componentDidUpdate(prevProps) {
        
    if(prevProps.data !== this.props.data){
            this.setState({
              data:this.props.data
            })
    }
  }

  handleContent(data,columns){
        
        const { onProductTableUpdate,fireblur,handleDelete }= this.props
        let count = this.state.topIndex 
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

  onChangePage = (pageOfItems) => {
          this.setState({pageOfItems: pageOfItems});
  }

  currentPageSetter = (currentPage) => {
        this.setState({
          currentPage:currentPage,
        })
  }

  startIndex = (index) => {
        this.setState({ 
          topIndex:index
         })
  }    

  render() {    
        return(
            <tbody>
                {this.handleContent(this.state.pageOfItems,this.props.columns)}
                <tr >
                    <td colSpan={`${this.props.columns.length+1}`} >
                    <div className="paginationOuter">
                        <Pagination 
                          items={this.state.data}
                          onChangePage={this.onChangePage} 
                          pageNumber={this.state.currentPage}
                          currentPage={this.currentPageSetter}
                          startIndex={this.startIndex}
                          />
                    </div>
                  </td>
                </tr>
            </tbody>
        );
    }
}
export default Content;