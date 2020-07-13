var axios = require("axios");
axios.get("http://localhost:8080/getMessage")
.then(response =>
  {
    console.log(response.data);
    axios.post("http://localhost:8080/ackGetMessage",{
      recieved:"success"
    }).then(response=>console.log(response.data))
    .catch(error=>console.error(error));
  }
).catch(error => console.error(error));
