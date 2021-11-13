console.log('Before');
// reading async data via callbacks
getUser(1).then(userRepositories);
console.log('After');

function displayCommits(commits) {
  console.log(commits);
}

function userRepositories(user)  {
  getRepositories(user.githubUserName)
  .then(repoCommits)
  .catch(error => console.log('Error ', error.message))
}

// reading async data via callbacks
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading User From DB...........');
      resolve({id: id, githubUserName: 'sherif'})
    }, 2000);
  })
}

function repoCommits(commits) {
  console.log('Repositories', commits);
}
function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Calling Github API for User: ${username} repos......`);
      resolve(['repo1', 'repo2', 'repo3']);
    }, 3000)
  })
}