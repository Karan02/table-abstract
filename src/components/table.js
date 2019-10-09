import React from "react"
import Header from "./header"
import Content from "./content"


class Table extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
        showAddSection: false,
        exampleItemsMaster: this.props.data,
        exampleItems:this.props.data,  
        pageOfItems: [],  
        addContent:{},
        blur:false,
        arrayOk:[],
        arrayFilter:[],
        intermediateArray2:[],
       }
     this.handleSearchOk=this.handleSearchOk.bind(this)
   }

    
    showAddSection = () => {
        this.setState({ 
          showAddSection:!this.state.showAddSection
        })
    }

    handleChange = (e) => {
      e.preventDefault();
      let addContent = this.state.addContent
      addContent[e.target.name] =e.target.value 
       this.setState({addContent:addContent})  
    }
    
    handleSubmit = (e) => {
      e.preventDefault();
      // console.log(this.state.addContent)
      this.AddEntries(this.state.addContent)
      this.setState({addContent:{},showAddSection:!this.state.showAddSection})
    }

    AddEntries = (addContent) => {
    
      var newObject2={}
      for(var i=0;i<this.props.columns.length;i++){
        newObject2[this.props.columns[i].title]=addContent[this.props.columns[i].title];
      }
      let dataAdded = [...this.state.exampleItems]
      dataAdded.push(newObject2)
      this.setState({
        exampleItems:dataAdded
      })  
    }

  handleAdd = () => { 
      let addContent = this.state.addContent;
      let handleChange = this.handleChange
      let inputs = this.props.columns.map(function(column,index){   
          return (<span id={index}>{column.title}:<input name={column.title} onChange={handleChange} value={addContent[column.title]} type="text" required="required" /></span>)
        }
      ) 
      inputs[`${this.props.columns.length}`]= <button type="submit" className="SubmitButton" >Submit</button>
      return <form onSubmit={this.handleSubmit}>{inputs}</form>
  }

  handleDelete = (row) => {
      let  exampleItems2  = [...this.state.exampleItems];
      let index = exampleItems2.indexOf(row);       
      exampleItems2.splice(index,1)
      this.setState({         
        exampleItems:exampleItems2
      });      
  }

  onProductTableUpdate = (evt) => {
        let item = {
          id: evt.target.id,
          name: evt.target.name,
          value: evt.target.value
        };
        console.log(item)
        let products = [...this.state.exampleItems];
        let newProducts = products.map(function(product,index) {
          
          Object.keys(product).forEach(key => {
           if (key == item.name && (index+1) == item.id) {      
                   product[key] = item.value;    
                 }                 
          }) 
          return product;
        });
        console.log(newProducts)
        this.setState({exampleItems:newProducts});
        
    }

  handleAddSection = () => {
       
        if(this.state.showAddSection){
        return this.handleAdd();}
    }
     
  handleSort = (order,index) => {
      var arrangeMethod = order
      this.orderChange(index,arrangeMethod)
    } 

  orderChange = (index,arrangeMethod) =>{
      
      this.arrangeText(index,arrangeMethod);
      
    }

  arrangeText = (key,arrangeMethod) => {
      
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

  fireblur = (boole) => {
      this.setState({blur:boole})
    } 
   
  
  handleSearchOk = (arrayOk,resetIndex) => {
    this.setState({arrayOk:arrayOk})
  } 
  
  handleFilterMaster = (matrix,index) => {
    this.setState({arrayFilter:matrix})
  }

  render(){

    let handleArray = this.state.exampleItems 
    for (let i = 0; i < this.state.arrayOk.length; i++) {
      if(this.state.arrayOk[i] && this.state.arrayOk[i]!=="") {
        handleArray = handleArray.filter(item => { 
          return item[Object.keys(item)[i]].indexOf(this.state.arrayOk[i]) !== -1
        });
      }
    }

    let pushArray = handleArray
    let intermediateArray = []
    let intermediateArray2 = []
    this.state.arrayFilter.forEach((element,index) => {
        element.forEach((each,indexinner) => {  
          if(each.isActive){  
            intermediateArray = pushArray.filter(row => {  
              return(
                (row[Object.keys(row)[index]]).indexOf(each.text) !== -1
              );
            })       
            intermediateArray2=intermediateArray2.concat(intermediateArray)
          }
        });
    });

   if(!intermediateArray2){
    // continue your work here
   }

    return(
        <div>
        <div  className={this.state.blur ? "blur":null}>
            <table>
            
              <Header 
                columns={this.props.columns} 
                handleSort={this.handleSort}
                handleSearchOk={this.handleSearchOk}
                handleSearchReset={this.handleSearchReset}
                handleFilterMaster={this.handleFilterMaster}
              />
             
                
              {intermediateArray2.length ? 
              <Content 
                handleDelete={this.handleDelete}
                columns={this.props.columns}
                data={intermediateArray2}
                onProductTableUpdate={this.onProductTableUpdate}
                fireblur={this.fireblur}
              />:
              <Content 
                handleDelete={this.handleDelete}
                columns={this.props.columns}
                data={pushArray}
                // currentIndex={this.state.topIndex}
                onProductTableUpdate={this.onProductTableUpdate}
                fireblur={this.fireblur}
                startIndex={this.startIndex}
              />}

            </table>
            
            <div className="addInput">
              <button className="addButton" onClick={this.showAddSection}>Add</button><br />
                <div className="inputs">
                  {this.handleAddSection()}
                </div>
            </div>
        </div>
  </div>
  );
  }
}
export default Table