import React from "react"


let defaultProps = {
    initialPage:1
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }
    
    componentWillMount() {
        
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.pageNumber);
            
     }
  }

    componentWillUpdate() {
        if(this.props.pageNumber !== this.state.pager.currentPage) {
            this.props.currentPage(this.state.pager.currentPage);  
        }
       
    }

    componentDidUpdate(prevProps,prevState) { 
       
      if (this.props.items !== prevProps.items) {
        this.setPage(this.props.pageNumber);   
      }
      if (this.props.pageNumber !== this.state.pager.currentPage) {
        this.props.currentPage(this.state.pager.currentPage);  
      }
       
    }
   
   
    setPage(page) {
        
        var items = this.props.items;
        var pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
           //this return statement is very important
            // return;
        }
            
        // get new pager object for specified page
        pager = this.getPager(items.length, page);
         

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        
        this.props.onChangePage(pageOfItems);
        
         
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
            
        }
        
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        this.props.startIndex(startIndex)
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        
        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() { 
       
        var pager = this.state.pager;
  
        return (
            
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a></li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                    <a onClick={() => this.setPage(page)}>{page}</a>
                </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        );
    }
}

// Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination