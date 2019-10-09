import React from 'react';
import './App.css';
import Table from "./components/table"

class App extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
      exampleItems:this.props.data 
    };
 }

  render() {
    const { columns } = this.props;
    const { exampleItems } = this.state;
    return(  
      <div className="App">
        <Table
          data={exampleItems} 
          columns={columns}
        />
      </div>
    );
  }
}

export default App;