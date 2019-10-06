import React from "react"

class FilterPopup extends React.Component{

    constructor(props){
        super(props);
       
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("click", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if(this.node.contains(event.target)) {  return}
        else{     
            this.props.closePopup(this.props.index);
            
          }
      };

    handleChange = (e) =>{
        console.log(e.target.name,e.target.checked,e.target.value)
    }

    handlefilterList=(filters)=>{
        this.props.handleFilterInfo(filters,this.props.index)
        let filtered = filters.map((filter,index) =>{
        //    return(<input type="radio" key={index} value={filter.value}>{filter.value})
        console.log(filter)
        return (<p><input
            key={index}
            id="my_id"
            type="checkbox"
            value={filter}
            name={filter}
            onChange={this.handleChange}
            // checked={this.props.isChecked[index]}
            />{filter}</p>
        )
        })
        return filtered
    } 

    render(){
         
        return(
            <div className="filterPopup" ref={node => this.node = node}>
            <div className="filteredValues">
            {this.handlefilterList(this.props.filters)}</div>
            <div className="filteredbuttons">
                <div className="filteredDone">
                  <button>Ok</button></div>
                  <div className="filteredReset">
                  <button>Reset</button>
                    </div>
            </div>
            </div>
        );
    }

}
export default FilterPopup