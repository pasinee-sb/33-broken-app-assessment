### Conceptual Exercise



- What are some ways of managing asynchronous code in JavaScript?
  - Callbacks:  functions that are passed as arguments to other functions and are called when the asynchronous operation completes. This is a simple way to manage asynchronous code, but it can be difficult to keep track of nested callbacks and to ensure that all of the callbacks are called correctly.
  - Promises: objects that represent the outcome of an asynchronous operation. They can be used to chain together asynchronous operations and to handle errors. They allow you to attach callbacks for both success (.then()) and failure (.catch()) cases.
  - Async/await: Async/await are keywords that allow you to write asynchronous code in a more synchronous style. The async keyword is used to define an asynchronous function, and the await keyword is used to pause the execution until the Promise is resolved or rejected.

- What is a Promise?
    - A promise is an object in JavaScript that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    - A promise has three possible states:
      - Pending: The promise has not yet been resolved or rejected.
      - Fulfilled: The promise has been resolved with a value.
      - Rejected: The promise has been rejected with an error.

- What are the differences between an async function and a regular function?
    - The main difference between an async function and a regular function is that an async function automatically returns a Promise and allows the use of the await keyword to pause the execution of the function until a Promise is resolved. This means that an async function can be used to perform asynchronous operations, such as making HTTP requests or reading from a file. A regular function, on the other hand, always returns a value.

- What is the difference between Node.js and Express.js?
    - Node.js is a runtime environment that allows JavaScript to be executed on the server-side, while Express.js is a web application framework built on top of Node.js. Node.js provides the underlying runtime and APIs for building server-side applications, while Express.js simplifies the process of building web applications and provides additional features and utilities.

- What is the error-first callback pattern?
  - The error-first callback pattern is a convention in Node.js for handling asynchronous operations that involve callbacks. In this pattern, the callback function takes two arguments: the first argument is reserved for an error object (if an error occurs), and the second argument is used to pass the result or data.

- What is middleware?
  - Middleware refers to a function or set of functions in Express.js that are invoked between the processing of a request and the generation of a response. Middleware functions have access to the request and response objects and can perform tasks such as modifying the request or response, executing additional code, or passing control to the next middleware function.

- What does the `next` function do?
  - The next function is used in Express.js middleware to pass control to the next middleware function in the stack. It is typically called within a middleware function to indicate that it has completed its processing and that the next middleware function should be invoked.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  - Performance: The code makes three separate HTTP requests to the GitHub API. This can be slow, especially if the API is under heavy load.
  - Structure: The code is not very well structured. The three HTTP requests are all made in one function, and the results are returned as an array. This makes it difficult to understand the code and to unit test it.
  - Naming: The variable names are not very descriptive. For example, the variable elie could be renamed to user1.
  

  ```async function getUsers() {
  const promises = [
    $.getJSON('https://api.github.com/users/elie'),
    $.getJSON('https://api.github.com/users/joelburton'),
    $.getJSON('https://api.github.com/users/mmmaaatttttt'),
  ];

  const users = await Promise.all(promises);

  return users;
}