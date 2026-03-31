const container = document.getElementById("usersContainer");
const searchInput = document.getElementById("search");
const errorDiv = document.getElementById("error");

let allUsers = [];

// Fetch all users
async function fetchUsers(){

  try{

    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    if(!response.ok){
      throw new Error("Failed to fetch users")
    }

    const users = await response.json()

    allUsers = users

    displayUsers(users)

  }catch(error){

    showError(error.message)

  }

}


// Fetch posts
async function fetchPosts(){

  const response = await fetch("https://jsonplaceholder.typicode.com/users/1/posts")

  const posts = await response.json()

  console.log("Posts:",posts)

}


// Create post
async function createPost(){

  const response = await fetch("https://jsonplaceholder.typicode.com/posts",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      title:"My First Post",
      body:"This is my post content",
      userId:1
    })

  })

  const data = await response.json()

  console.log("Created Post:",data)

}


// Display users
function displayUsers(users){

  container.innerHTML = users.map(user=>`

    <div class="user-card">

      <h3>${user.name}</h3>

      <p>Email: ${user.email}</p>

      <p>Company: ${user.company.name}</p>

      <p>City: ${user.address.city}</p>

    </div>

  `).join("")

}


// Search users
searchInput.addEventListener("input",(e)=>{

  const query = e.target.value.toLowerCase()

  const filtered = allUsers.filter(user =>

    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)

  )

  displayUsers(filtered)

})


// Show error
function showError(message){

  errorDiv.textContent = "Error: "+message

}


// Initialize
async function init(){

  await fetchUsers()

  await fetchPosts()

  await createPost()

}

init()
