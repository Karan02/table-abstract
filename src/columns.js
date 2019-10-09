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
    sorter: true,
    filters: [{text:'Edward King 2'},{text:'Edward King 5'}]
  },
  {
    title: 'gender',
    dataIndex: 'gender',
    filters: [{text:'Male'} ,{ text:'Female' }],
    width: '200px',
    search:true,
    sorter:true,
  },
  {
    title: 'address',
    dataIndex: 'address',
    search: true,
    filters: [{text:'London'}, {text:'London'}],
    width:"350px",
    
      
  },
  {
    title:"location",
    search:true,
    width:"150px",
  },
];
export default columns;