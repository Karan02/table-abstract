import React from "react"

class FilterPopup extends React.Component{

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

    handleChange = (e) =>{
        this.props.handleCheckChange(e.target.value,this.props.index,e.target.checked)
    }

    handlefilterList=(filters)=>{
        let filtered = filters.map((filter,index) =>{     
        return (<p><input
            key={index}
            id="my_id"
            type="checkbox"
            value={index}
            name={filter.text}
            onChange={this.handleChange}
            checked={this.props.isChecked[index].isActive}
            />{filter.text}</p>
            )
        })
        return filtered
    } 

    handleReset = () => {
        this.props.handleFilterReset(this.props.index)
    }
    handleOk = () => {
        this.props.handleFilterOk(this.props.index)
    }
    render(){
         
        return(
            <div className="filterPopup" ref={node => this.node = node}>
              <div className="filteredValues">
                  {this.handlefilterList(this.props.filters)}
              </div>
              <div className="filteredbuttons">
                    <div className="filteredDone">
                      <button onClick={this.handleOk}>Ok</button>
                    </div>
                    <div className="filteredReset">
                      <button onClick={this.handleReset}>Reset</button>
                    </div>
              </div>
            </div>
        );
    }

}
export default FilterPopup