// const handleManager = require('./Team-Profile-Generator/handleManager');
const inquirer = require('inquirer');
const fs = require('fs');
const sequelize = require('./config/connection');

const { title, exit } = require('process');

//-------------------handle main-----------------------------
function handleMain(answers){
  console.log(answers.mainPage);
  if( answers.mainPage === 'view all departments'){
      sequelize.query('SELECT * FROM department;', function (err, result) {
        if (err) {
          console.log(err);
        }
        printOut(result);
        init(); 
      });
  }else if( answers.mainPage === 'view all roles'){
    sequelize.query('SELECT role.id,role.title,role.salary,department.name as Department FROM role JOIN department ON role.department_id = department.id;', function (err, result) {
      if (err) {
        console.log(err);
      }
      printOut(result);
      init(); 
    });
}else if( answers.mainPage === 'view all employees'){
  sequelize.query(`
  SELECT employee.id,employee.first_name,employee.last_name,manager_id,role.title,role.salary,department.name
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id;`
  , function (err, result) {
    if (err) {
      console.log(err);
    }
    printOut(result);
    init(); 
  });
}
  else {exit}
} 

//-------------------main prompt-----------------------------
const MainPrompt = () => {
  return inquirer.prompt([
    {
        type: 'rawlist',
        name: 'mainPage',
        message: 'Hi! In this app you can manage the departments, roles, and employees in the company , \nplease choose one of the information below : ',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role','Exit']
    }
  ]);
};
//--------------------print out------------------------------
function printOut(result){
  console.log(result)
  console.log('\n');
  Object.keys(result).forEach(function(key) {
    var row = result[key];
    console.log(
    row.id!=undefined?row.id+'\t':'',
    row.first_name!=undefined?row.first_name+'\t':'',
    row.last_name!=undefined?row.last_name+'\t':'',
    row.salary!=undefined?row.salary+'\t':'',
    row.name!=undefined?row.name+'\t':'',
    row.title!=undefined?row.title+'\t':'',
    row.Department!=undefined?row.Department+'\t':''
    )
  });
  console.log('\n');
}
//${Badge!='undefined'?'# '+Badge:'none'}
//------------------------------------------------------------
const init = () => {
    MainPrompt()
      .then((answers) => handleMain(answers))
    //   .then(() => {
    //                 console.clear();
    //                 console.log(`Successfully wrote to file`);
    //               })
      .catch((err) => console.error(err));
  };
// Function call to initialize app
init(); 


