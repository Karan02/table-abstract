import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from "./components/table"
import { func } from 'prop-types';

class App extends React.Component{
 constructor(props){
   super(props)
   this.state={exampleItems:this.props.data}
  //  this.handleSearchOk = this.handleSearchOk.bind(this)
 }
  // async handleSearchOk  (searchArray,index){
  //   let exampleItems2=[];  
  //   let exampleItems = this.state.exampleItems.map(function (item,index2) {
      
  //     let value=item[Object.keys(item)[index]]
      
  //     let valueItem=value.toLowerCase();
  //     let valueOk=searchArray[index].toLowerCase();
      
  //     if(valueOk.indexOf(valueItem) === 0){
  //       exampleItems2.push(item)
  //       return item;
  //     }
  //     else{
  //       return null
  //     }
  //   })
  //   console.log(exampleItems2)
  //   await this.setState({exampleItems:exampleItems2})
  // }
render(){
  
  return(  
    <div className="App">
     
      <Table 
     
      data={this.state.exampleItems} 
      columns={this.props.columns}
      handleSearchOk={this.handleSearchOk}
      />
    </div>
  );
  }
}

export default App;