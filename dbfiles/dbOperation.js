const config = require("./dbConfig");
const sql = require("mssql/msnodesqlv8");

const getEmployees = async (id) => {
  try {
    let pool = await sql.connect(config);
    let employees = await pool.request().query(`SELECT * from GroupA_Worker WHERE id='${id}'`);
    console.log(employees);
    return employees;
  } catch (err) {
    throw err
    //console.log(err);
  }
}
const createEmployees = async (Employee) => {
  try {
    let pool = await sql.connect(config);
    pool.request().query(`INSERT INTO GroupA_Worker VALUES (${Employee.id},'${Employee.FirstName}','${Employee.LastName}',${Employee.Age},'${Employee.Gender}')`);
    //console.log(employees);
    //return employees;
    console.log('Server connected, inserted data.');
  } catch (err) {
    throw err
    //console.log(err);
  }
}
module.exports = {getEmployees,createEmployees};