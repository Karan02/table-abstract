const data = [];
for (let i = 0; i < 12; i++) {
  data.push({
    roll_n: i,
    name: `Edward King ${i}`,
    gender: i%2 === 0 ? "Male":"Female",
    address: `London, Park Lane no. ${i}`,
  });
}
  export default data