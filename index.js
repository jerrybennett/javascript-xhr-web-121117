// document.addEventListener("DOMContentLoaded", function(event) {
//   console.log("DOM fully loaded and parsed");

function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  console.log(this.responseText);
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        `<li>${r.name}<a href="#" data-repo="${
          r.name
        }" onclick="getCommits(this)">Get Commits</a></li>`
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(e) {
  const name = e.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open(
    "GET",
    "https://api.github.com/repos/jerrybennett/" + name + "/commits"
  );
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        `<li><strong>${commit.author.login}</strong> - ${
          commit.commit.message
        }</li>`
    )
    .join("")}<ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/jerrybennett/repos");
  req.send();
}
// });
