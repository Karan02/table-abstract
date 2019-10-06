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
      filters: [ 'Male' , 'Female' ],
      width: '200px',
      search:true,
      sorter:true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      search: true,
      filters: ['London', 'London' , 'hanover' , 'dallas'],
      width:"350px",
     
       
    },
    
  ];
  export default columns