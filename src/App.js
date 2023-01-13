import "./App.css";
import { useState } from "react";
import axios from "axios";

//employee object;
const empObj = {
  id: 0,
  FirstName: "",
  LastName: "",
  Age: 0,
  Gender: "",
};

function App() {
  const [returnData, setReturnData] = useState("");
  const [Employee, setEmployee] = useState(empObj);

  //getting data from input field.

  const setInput = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === "id" || name === "Age") {
      setEmployee((prevstate) => ({
        ...prevstate,
        [name]: parseInt(value),
      }));
      return;
    }
    setEmployee((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  //fetching data using axios framework.

  // const getEmployees = async (url) => {
  //   if (Employee.id !== 0) {
  //     axios
  //       .post(
  //         url,
  //         { name: Employee.id },
  //         {
  //           "content-type": "application/json",
  //           "Accept": "application/json",
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data.length !== 0) {
  //           //this to see the retrived data
  //           console.log(res.data[0]);
  //           setReturnData(res.data[0]);
  //         } else {
  //           return alert("No Data retrived!\n Enter the corect ID.");
  //         }
  //       })
  //       .catch((err) => console.log("connection error"));
  //   } else {
  //     alert("Enter the Id of the Employee!");
  //   }
  // };


  // fetching data using js built-in fetch method.

  const getEmployees=async(url)=>{
    //console.log(Employee)
    if(Employee.id!==0){
    const newData= await fetch(url,{
      method:'POST',
      headers:{
        'content-type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({
        name:Employee.id
      })
    })
    .then(res=>res.json());
    (newData.length===0)?alert('No Data Retrived'):setReturnData(newData[0]);
    console.log("Retrived Data: "+JSON.stringify(newData[0]))
    }
    else{
      alert('Enter the ID --\n  to get the Data!')
    }
  }

  //using axios framework.

  const createEmployees=async (url)=>{
      axios
        .post(
          url,
          { ...Employee },
          {
            "content-type": "application/json",
            "Accept": "application/json",
          }
        )
        .then((res) => {
          //this to see the retrived data
            console.log(res.data[0]);
            setReturnData(res.data[0]);
        })
        .catch((err) => console.log("connection error"));
  }
  
  //using js fetch method.

  // const createEmployees = async (url) => {
  //   const newData = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({ ...Employee }),
  //   }).then((res) => res.json());
  //   setReturnData(newData[0]);
  //   console.log(newData);
  // };
  //getData('/api');

  //** NOTICE : both way of fatching data gives the same out put. but the efficent way is to use axios framwork.

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          width: "150px",
          margin: "auto",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="number"
          name="id"
          placeholder="EmployeeID"
          onChange={setInput}
        ></input>
        <input
          type="text"
          name="FirstName"
          placeholder="FirstName"
          onChange={setInput}
        />
        <input
          type="text"
          name="LastName"
          placeholder="LastName"
          onChange={setInput}
        />
        <input
          type="number"
          name="Age"
          placeholder="Age"
          onChange={setInput}
        ></input>
        <input
          type="text"
          name="Gender"
          placeholder="Gender"
          onChange={setInput}
        ></input>
      </div>
      <button onClick={() => createEmployees("/quit")}>create</button>
      <br />
      <p>To get the Result enter the ID</p>
      <button onClick={() => getEmployees("/api")}>Get Result</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <p>EmployeeID: {returnData.id}</p>
        <p>FirstName: {returnData.FirstName}</p>
        <p>LastName: {returnData.LastName}</p>
        <p>Age: {returnData.Age}</p>
        <p>Gender: {returnData.Gender}</p>
      </div>
      {/* <button onClick={()=>fetchingData('/quit')}>click me</button> */}
    </div>
  );
}

export default App;
