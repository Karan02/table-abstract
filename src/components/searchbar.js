import React from "react"
 

class Searchbar extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.searchValue
        }
    }

    componentWillReceiveProps(props, state) {
        if(this.state.search !== props.searchValue){
            this.setState({search:props.searchValue})
           
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("click", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        
      if(this.node.contains(event.target)) { 
        return
      }
      else{     
          this.props.closePopup(this.props.index);    
      }
    };

    handleChange = (e) => {
        this.props.setSearchValues(e.target.value,this.props.index)
    }

    handleReset = () => {
        this.props.resetSearchValue(this.props.index);
        
    }
  
    handleSearchOk = () => {
        this.props.handleSearchOk(this.props.index)
    }
    render(){
        
        return(
        <div className="SearchPopup"  ref={node => this.node = node}>
           <div className="searchInput">
              <input type="text" value={this.state.search} onChange={this.handleChange} /></div>
              <div className="searchButtons">
               <button  className="searchOK" onClick={this.handleSearchOk}>ok</button>
               <button className="searchReset" onClick={this.handleReset}>reset</button>
              </div>
        </div>
        ); 
    }
}
export default Searchbar