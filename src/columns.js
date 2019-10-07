const columns = [
    {
      title:"roll_no",
      sorter:true,
      width:"250px",
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '250px',
      search: true,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [ {text:'Male'} ,{text:'Female'} ],
      width: '200px',
      search:true,
      sorter:true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      search: true,
      filters: [{text:'London'}, {text:'London'} , {text:'hanover'} ,{text: 'dallas'}],
      width:"350px",
     
       
    },
    
  ];
  export default columns