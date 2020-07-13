var axios = require("axios");
var jobs = process.argv.slice(2);
console.log(jobs);
axios.post("http://localhost:8080/addMessage/", {
  message: jobs
})
  .then(response => { console.log(response.data); })
  .catch(error => console.error(error));


