
async function printActions() {
  const customer = await getCustomer(1)
  console.log('Customer: ', customer);
  if (customer.isGold) {
    const movies = await getTopMovies()
    console.log('Top movies: ', movies)
    await sendEmail(customer.email, movies)
    console.log('Email sent...')
  }
}
printActions()
//  getCustomer(1, (customer) => {
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//        sendEmail(customer.email, movies, () => {
//       });
//     });
//   }
// });

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Sherif Nabil',
        isGold: true,
        email: 'some email'
      });
    })
  }, 4000);
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  })
}