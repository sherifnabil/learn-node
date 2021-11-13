
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1) // pending => resolved, fullfilled
    // reject(new Error('msg')) // pending => rejected
  }, 2000)
});
p
  .then((data) => console.log('Result: ' + data))
  .catch((error) => console.log('Error: ' + error.message));