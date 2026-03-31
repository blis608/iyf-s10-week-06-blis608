// =======================================
// Task 11.1 – Understanding Async
// =======================================

// Synchronous example
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");

// Asynchronous example
console.log("1 - Start");

setTimeout(() => {
  console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");

// Predict the output example
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");


// =======================================
// Callback Pattern
// =======================================

function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData(function(data) {
  console.log("Data received:", data);
});


// Simulate loading a user
function loadUser(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: "John" };
    callback(user);
  }, 1500);
}

loadUser(1, function(user) {
  console.log("Loaded user:", user);
});


// =======================================
// Task 11.2 – Callback Hell
// =======================================

function getUserData(userId, callback) {
  setTimeout(() => {
    callback({ id: userId, name: "John" });
  }, 1000);
}

function getUserPosts(userId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" }
    ]);
  }, 1000);
}

function getPostComments(postId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, text: "Great post!" },
      { id: 2, text: "Thanks for sharing" }
    ]);
  }, 1000);
}

// Callback Hell example
getUserData(1, function(user) {
  console.log("User:", user);

  getUserPosts(user.id, function(posts) {
    console.log("Posts:", posts);

    getPostComments(posts[0].id, function(comments) {
      console.log("Comments:", comments);
    });
  });
});


// =======================================
// Promises
// =======================================

const myPromise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("It worked!");
    } else {
      reject("Something went wrong");
    }
  }, 1000);
});

myPromise
  .then(result => {
    console.log("Success:", result);
  })
  .catch(error => {
    console.log("Error:", error);
  });


// =======================================
// Promise Versions of Functions
// =======================================

function getUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "John" });
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
  });
}

function getUserPostsPromise(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" }
      ]);
    }, 1000);
  });
}

function getPostCommentsPromise(postId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "Great post!" },
        { id: 2, text: "Thanks for sharing" }
      ]);
    }, 1000);
  });
}


// =======================================
// Task 11.3 – Promise Chaining
// =======================================

getUserDataPromise(1)
  .then(user => {
    console.log("User:", user);
    return getUserPostsPromise(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
    return getPostCommentsPromise(posts[0].id);
  })
  .then(comments => {
    console.log("Comments:", comments);
  })
  .catch(error => {
    console.error("Error:", error);
  });


// =======================================
// Async / Await Version
// =======================================

async function getDataWithAsync() {
  const user = await getUserDataPromise(1);
  const posts = await getUserPostsPromise(user.id);
  const comments = await getPostCommentsPromise(posts[0].id);

  return comments;
}

getDataWithAsync().then(comments => {
  console.log("Comments from async/await:", comments);
});


// =======================================
// Error Handling with Try/Catch
// =======================================

async function fetchUserData(userId) {
  try {
    const user = await getUserDataPromise(userId);
    const posts = await getUserPostsPromise(user.id);

    return { user, posts };

  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

fetchUserData(1).then(data => {
  console.log("User Data:", data);
});


// =======================================
// Parallel Requests with Promise.all
// =======================================

async function getAllUsers() {

  const [u1, u2, u3] = await Promise.all([
    getUserDataPromise(1),
    getUserDataPromise(2),
    getUserDataPromise(3)
  ]);

  console.log("All users:", [u1, u2, u3]);

  return [u1, u2, u3];
}

getAllUsers();


// =======================================
// Promise.race Example
// =======================================

const fast = new Promise(resolve =>
  setTimeout(() => resolve("Fast!"), 100)
);

const slow = new Promise(resolve =>
  setTimeout(() => resolve("Slow!"), 500)
);

Promise.race([fast, slow])
  .then(result => {
    console.log("Winner:", result);
  });


// =======================================
// Final Build Task – Fetch 3 Users
// =======================================

async function fetchThreeUsers() {
  const users = await Promise.all([
    getUserDataPromise(1),
    getUserDataPromise(2),
    getUserDataPromise(3)
  ]);

  console.log("Fetched 3 users:", users);
}

fetchThreeUsers();
