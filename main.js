const userContainer = document.getElementById("userContainer");
const searchInput = document.getElementById("search");

let users = [];

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  users = await response.json();
  displayUsers(users);
}

function displayUsers(userList) {

  userContainer.innerHTML = "";

  userList.forEach(function(user){

    const card = document.createElement("div");
    card.classList.add("user-card");

    card.innerHTML = `
<h3>${user.name}</h3>
<p>Email: ${user.email}</p>
<p>Company: ${user.company.name}</p>
<p>City: ${user.address.city}</p>
`;

    userContainer.appendChild(card);

  });

}

searchInput.addEventListener("keyup", function(){

  const searchValue = searchInput.value.toLowerCase();

  const filteredUsers = users.filter(function(user){

    return user.name.toLowerCase().includes(searchValue);

  });

  displayUsers(filteredUsers);

});

fetchUsers();
