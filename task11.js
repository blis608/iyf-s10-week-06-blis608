// =======================================
// Task 11 – Understanding Async
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
// Callback Example
// =======================================

function fetchData(callback) {

  setTimeout(() => {

    const data = { name:"John", age:30 };

    callback(data);

  },1000);

}

fetchData(function(data){
  console.log("Data received:",data);
});


// =======================================
// Callback Hell
// =======================================

function getUserData(id,callback){

  setTimeout(()=>{
    callback({id:id,name:"John"});
  },1000)

}

function getUserPosts(id,callback){

  setTimeout(()=>{
    callback([
      {id:1,title:"Post 1"},
      {id:2,title:"Post 2"}
    ])
  },1000)

}

function getPostComments(id,callback){

  setTimeout(()=>{
    callback([
      {id:1,text:"Great post"},
      {id:2,text:"Nice work"}
    ])
  },1000)

}

getUserData(1,function(user){

  console.log("User:",user)

  getUserPosts(user.id,function(posts){

    console.log("Posts:",posts)

    getPostComments(posts[0].id,function(comments){

      console.log("Comments:",comments)

    })

  })

})


// =======================================
// Promise Example
// =======================================

const myPromise = new Promise((resolve,reject)=>{

  const success = true

  setTimeout(()=>{

    if(success){
      resolve("It worked!")
    }else{
      reject("Something went wrong")
    }

  },1000)

})

myPromise
.then(result=>{
  console.log("Success:",result)
})
.catch(error=>{
  console.log("Error:",error)
})
