//this is severside programing.
//creating the server access point.

const express = require("express"); //framework used to connect fornt end to the server
const cors = require("cors"); //driver allow comunication between front end  to the server in local machine.

//for sql connection.
const dbOperation = require("./dbfiles/dbOperation");
const Employee = require("./dbfiles/Employee");

//data to insert.
let data = new Employee("Bijay", "Manger", 26, "Male");
//console.log(data);
// dbOperation.getEmployees().then(res=>{
//     console.log(res.recordset);
// })

//dbOperation.createEmployees(data);

const API_PORT = process.env.PORT || "5000";
const app = express();

app.use(cors());
app.use(express.json()); //allow us to take json passed from front end to the server.
app.use(express.urlencoded()); //destructing the body of json that is passed from front end.

//creating request.
app.post("/api", async(req, res)=>{
  let result= await dbOperation.getEmployees(req.body.name);
  console.log("called Api");
  res.send(result.recordset);
});

app.post("/quit", async (req, res)=>{
  await dbOperation.createEmployees(req.body);
  let result= await dbOperation.getEmployees(req.body.id);
  console.log("called Quit");
  res.send(result.recordset);
});
app.listen(API_PORT, () => console.log(`Listening to the Port: ${API_PORT}`));
