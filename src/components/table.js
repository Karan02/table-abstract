import React from "react"
import Header from "./header"
import Content from "./content"
import Pagination from "./pagination"
import FakeTimers from "@jest/fake-timers/build/jestFakeTimers";
import { func } from "prop-types";

class Table extends React.Component{
   constructor(props){
       super(props);
       this.state={
        showAddSection: false,
        exampleItemsMaster: this.props.data,
        exampleItems:this.props.data,  
        pageOfItems: [],  
        currentPage:1,
        addContent:{},
        topIndex:0, //each page top index
        blur:false,
       }
     this.handleSearchOk=this.handleSearchOk.bind(this)
   }
  //  componentWillReceiveProps(nextProps) {

  //     if(this.state.exampleItems !== nextProps.data){
  //     this.setState({exampleItems:this.props.data})
  //   } 
  // }
  //  componentWillUpdate(){
  //   if(this.state.exampleItems !== this.props.data){
  //     this.setState({exampleItems:this.props.data})
  //   }
  // }
  // getDerivedStateFromProps(props, state){
  //     if(this.state.exampleItems !== this.props.data){
  //     this.setState({exampleItems:this.props.data})
  //   }
  // }
    onChangePage=(pageOfItems)=> {
    // update state with new page of items
      this.setState({pageOfItems: pageOfItems});
      
    }
    
    showAddSection = () =>{
        this.setState({showAddSection:!this.state.showAddSection})
    }

     handleChange=(e)=>{
      e.preventDefault();
      let addContent = this.state.addContent
      addContent[e.target.name] =e.target.value 
       this.setState({addContent:addContent})  
    }
    
    handleSubmit=(e)=>{
      e.preventDefault();
      // console.log(this.state.addContent)
      this.AddEntries(this.state.addContent)
      this.setState({addContent:{},showAddSection:!this.state.showAddSection})
    }

     AddEntries=(addContent)=>{
    
      var newObject2={}
      for(var i=0;i<this.props.columns.length;i++){
        // newObject2[this.props.columns[i].title]=addContent[Object.keys(addContent)[i]];
        newObject2[this.props.columns[i].title]=addContent[this.props.columns[i].title];
      }
      let dataAdded = [...this.state.exampleItemsMaster]
      dataAdded.push(newObject2)
      this.setState({exampleItemsMaster:dataAdded,exampleItems:dataAdded})
      
    }
    
    
    handleAdd = () =>{
        let addContent = this.state.addContent;
        let handleChange = this.handleChange
        let inputs = this.props.columns.map(function(column,index){   
          return (<span id={index}>{column.title}:<input name={column.title} onChange={handleChange} value={addContent[column.title]} type="text" required="required" /></span>)
          }
        )
        // console.log(typeof inputs)
        inputs[`${this.props.columns.length}`]= <button type="submit" className="SubmitButton" >Submit</button>
        // inputs = Object.assign({3: <button className="SubmitButton" onClick={this.handleAdd}>Submit</button>}, inputs)
        
        return <form onSubmit={this.handleSubmit}>{inputs}</form>
    //    return( <div className="addButton">
    //        {/* {console.log(this.props.columns)} */}
        
    //     {/* A: <input type="text" name="one" value={this.state.one} onChange={this.handleChange}/>
    //     B: <input type="number"  name="two" value={this.state.two} onChange={this.handleChange}/>
    //     C: <input type="number"  name="three" value={this.state.three} onChange={this.handleChange}/>
    //     D: <input type="text"  name="four" value={this.state.four} onChange={this.handleChange}/> */}
        
        
    // </div>)
    }
    
    currentPageSetter=(currentPage)=>{
         this.setState({
          currentPage:currentPage,
        })
         
      }
    handleDelete = (row) =>{
       
        let  exampleItems2  = [...this.state.exampleItemsMaster];
        let index = exampleItems2.indexOf(row);
        
        exampleItems2.splice(index,1)
        this.setState({exampleItemsMaster:exampleItems2,exampleItems:exampleItems2});
        
        
      }
    startIndex = (index) =>{
        this.setState({topIndex:index})
      }
    onProductTableUpdate=(evt)=>{
        // console.log(e.target.value,e.target.name,e.target.id)
        // let variable = this.state.exampleItems[e.target.id-1]
        // let name = e.target.name
        // console.log(variable.name=e.target.value)

        let item = {
          id: evt.target.id,
          name: evt.target.name,
          value: evt.target.value
        };

        let products = this.state.exampleItems;
        let newProducts = products.map(function(product,index) {
          
          Object.keys(product).forEach(key => {
            // eslint-disable-next-line
            // console.log(item.id,index)

            if (key == item.name && (index+1) == item.id) {      
                   product[key] = item.value;    
                 }
                 
          }) 
          return product;
        });
        this.setState({exampleItemsConstant:newProducts});
      }
    handleAddSection=()=>{
       
        if(this.state.showAddSection){
        
        return this.handleAdd();}
      }
     
    handleSort = (order,index) =>{
      var arrangeMethod = order
      this.orderChange(index,arrangeMethod)

    } 

    orderChange = (index,arrangeMethod) =>{
      this.arrangeText(index,arrangeMethod);
      
        // if(false) {
        //   this.arrangeNumber(index, arrangeMethod);
        // }
        // if(false){
        //   this.arrangeText(index,arrangeMethod);
        // }
      }
      
   
    arrangeText = (key,arrangeMethod) =>{
      
        let arraycopy = [...this.state.exampleItems];
        if(arrangeMethod === "asc"){
          arraycopy.sort(function(a,b){
            if((a[Object.keys(a)[key]]) < (b[Object.keys(b)[key]])){ return -1;}
            if((a[Object.keys(a)[key]]) > (b[Object.keys(b)[key]])){ return 1;}
            return 0
          })
        }
        if(arrangeMethod === "des"){
          arraycopy.sort(function(a,b){
            if((a[Object.keys(a)[key]]) > (b[Object.keys(b)[key]])){ return -1;}
            if((a[Object.keys(a)[key]]) < (b[Object.keys(b)[key]])){ return 1;}
            return 0
          })
        }
      
        this.setState({exampleItems:arraycopy});
     }

    fireblur=(boole)=>{
      this.setState({blur:boole})
     } 
   
  
 async handleSearchOk(arrayOk,resetIndex){
   
    let exampleItemscopy = this.state.exampleItemsMaster 
    // let exampleItemsArray = this.state.exampleItemsArray
      
    // let lengthof = exampleItemsArray.length
   
    // exampleItemscopy = exampleItemsArray[lengthof-1]
    
    let handleArray = exampleItemscopy
    // = exampleItemscopy
    
    for(let i=0;i<arrayOk.length;i++){
     
      if(arrayOk[i] && arrayOk[i]!==""){
        
        handleArray = exampleItemscopy.filter(item => {
         
            // let x = item[Object.keys(item)[i]]
           return item[Object.keys(item)[i]].indexOf(arrayOk[i]) !== -1
           
        }
          )
        // console.log(arrayOk[i],i)
      }
    }
    
    // exampleItemsArray.push(handleArray)
    
  //  await this.setState({exampleItems:exampleItemsArray[lengthof-1]})
    await this.setState({exampleItems:handleArray})
    

  } 
  
  handleFilterMaster=(matrix,index)=>{
    console.log(matrix,index)
  }

  render(){
      
        return(
          
            <div  className={this.state.blur ? "blur":null}>
                <table>
               
                    <Header 
                      columns={this.props.columns} 
                      handleSort={this.handleSort}
                      handleSearchOk={this.handleSearchOk}
                      handleSearchReset={this.handleSearchReset}
                      handleFilterMaster={this.handleFilterMaster}
                    />
                    <Content 
                      handleDelete={this.handleDelete} 
                      data={this.state.pageOfItems}
                      currentIndex={this.state.topIndex}
                      onProductTableUpdate={this.onProductTableUpdate}
                      fireblur={this.fireblur}
                    />
              
                </table>
                {/* {console.log(this.props.columns.length)} */}
                {/* {console.log(this.props.columns[0].title)} */}
                <div className="addInput">
                <button className="addButton" onClick={this.showAddSection}>Add</button><br />
                <div className="inputs">
                {/* {this.state.showAddSection ? this.handleAdd():null }  */}
                {this.handleAddSection()}
                </div>
                {/* {console.log(this.handleAdd())} */}</div>
                <div className="paginationOuter">
                <Pagination 
                      items={this.state.exampleItems} 
                      onChangePage={this.onChangePage} 
                      pageNumber={this.state.currentPage}
                      currentPage={this.currentPageSetter}
                      startIndex={this.startIndex}
                />
                        </div>
            </div>
        );
  }
}
export default Table