import React from "react"
import SearchBar from "./searchbar"
import {Icon} from "antd"
import FilterPopup from "./filterpopup";
import style2 from '../style'
import '../App.css' 
import Sorter from "./sorter"



class Header extends React.Component{

    constructor(props){
        super(props);
        
        this.state={
            filters:[],
            searches:[],
            searchValues:[],
            searchValuesOk:[],
            isChecked:[],
            filterValues:[],

        }
        this.handleHeaders = this.handleHeaders.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.togglePopupFilter=this.togglePopupFilter.bind(this)
        this.handleSearchOk = this.handleSearchOk.bind(this)
        this.handleFilterReset = this.handleFilterReset.bind(this)
    }
    componentDidMount(){
        let filterValues = this.state.filterValues
        let readycolumns = this.props.columns.map((column,index) =>{
        if(column.filters){
            let result = column.filters.map(function(el) {
                let o = Object.assign({}, el);
                o.isActive = false;
                return o;
              })
              filterValues[index] = result
            }      
        })
        if(filterValues !== this.state.filterValues){
        this.setState({})
        }
    }

    // componentWillMount(){
      
       
    //     // var myGrid = [...Array(filters.length).fill(false)]
    //     // let filterInitial = this.state.isChecked
    //     // filterInitial.push(myGrid)
    //     // this.setState({isChecked:filterInitial})
    //     // console.log(filters,myGrid)
    // }

    handleSorter(index){
        return (
            <Sorter key={index} index={index} handleSort={this.props.handleSort} />
        )
    }
     togglePopupFilter(index){
        
        const {filters} = this.state;
        filters[index] = !this.state.filters[index];
        this.setState({});
        // console.log(index);
        
        
    }
    toggleSearchFilter(index){
        const {searches} = this.state;
        searches[index] = !this.state.searches[index];
        this.setState({});
    }
    setSearchValues=(value,index)=>{
       
       let searchValues= this.state.searchValues;
       searchValues[index]=value;
       this.setState({}); 
    }
    resetSearchValue=(index)=>{
        let searchValues= this.state.searchValues;
        let searchValuesOk = this.state.searchValuesOk;
        searchValues[index]="";
        searchValuesOk[index] ="";
        this.setState({});
        this.props.handleSearchOk(searchValuesOk)
        // this.props.handleSearchReset(searchValuesOk,index)
    }
   
    handleCheckChange=(index,superindex,isChecked)=>{
        
        let filterValues = this.state.filterValues
        filterValues[superindex][index].isActive=isChecked
        this.setState({})
       
    }

    async handleFilterReset(index){
        let filterValues = this.state.filterValues
        let filterValues2 = filterValues[index].map((filter,index) =>{
            filter.isActive = false
            return filter
        })
        filterValues[index]=filterValues2
        await this.setState({})
        // this.closePopupFilter(index)
        this.props.handleFilterMaster(this.state.filterValues,index)

    } 

    handleFilterOk=(index)=>{
        this.props.handleFilterMaster(this.state.filterValues,index)
    }

    handleFilter(filters,index){
       

        return(
        
        <div className="filterPopupOuter">
            
            {/* {console.log(this.state.filter)} */}
             <Icon type="filter" onClick={() => this.togglePopupFilter(index)}/>
             
             {this.state.filters[index] ? 
             
             <FilterPopup 
                key={index}
                closePopup={this.closePopupFilter} 
                index={index} 
                filters={filters} 
                isChecked={this.state.filterValues[index]}
                handleCheckChange={this.handleCheckChange}
                handleFilterReset={this.handleFilterReset}
                handleFilterOk={this.handleFilterOk}
                // handleFilterInfo={this.handleFilterInfo}
             />:null}
            
            {/* {(this.state.filter[index] === true) ? <filterPopup />:null} */}
        </div>
        );
    }
    //here
    async handleSearchOk(index){
        // this.props.handleSearchOk(this.state.searchValues,index)
        let searchValuesOk = this.state.searchValuesOk
        searchValuesOk[index]=this.state.searchValues[index]
        await this.setState({searchValuesOk:searchValuesOk})
        this.props.handleSearchOk(searchValuesOk)
        
    }
    handleSearch=(index)=>{
      
        return(<div className="SearchPopupOuter">
            <Icon type="search" onClick={() => this.toggleSearchFilter(index)}/>
            {this.state.searches[index] ? 
            <SearchBar 
                key={index}
                searchValue={this.state.searchValues[index]}
                closePopup={this.closePopupSearch} 
                index={index} 
                setSearchValues={this.setSearchValues}
                resetSearchValue={this.resetSearchValue}
                handleSearchOk={this.handleSearchOk}
            />:null}
            
        </div>) 

    }  
    handleHeaders(columns){
        // style={style2}
        
        let readycolumns= columns.map((column,index) =>{
        
        return (<th style={{width:`${column.width}`}} key={column.dataIndex}>{column.title}
        <div className="icons">
        {column.sorter ? this.handleSorter(index) : null}
        {column.filters ? this.handleFilter(column.filters,index): null}
        {column.search ? this.handleSearch(index):null}
        
        </div>
        </th>
        )
       })
       
       return readycolumns
    }
    closePopupSearch = (index) => {
        const {searches} = this.state;
        searches[index] = !this.state.searches[index];
        this.setState({});
    }
    closePopupFilter = (index) =>{
        const {filters} = this.state;
        filters[index] = !this.state.filters[index];
        this.setState({});
    }
    render(){
        
        return(
            <thead>
            <tr>{this.handleHeaders(this.props.columns)}<th>Actions</th></tr>
            </thead>
        );
    }
}
export default Header