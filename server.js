// const handleManager = require('./Team-Profile-Generator/handleManager');
const inquirer = require('inquirer');
//const addEmp = require('./addEmp');
const sequelize = require('./config/connection');
const { title, exit } = require('process');
var clearS = 0;
//-------------------handle main-----------------------------
function handleMain(answers){
  console.log('\n',answers.mainPage);
  if( answers.mainPage === 'view all departments'){
    clearS = 1;
      sequelize.query('SELECT * FROM department;', function (err, result) {
        if (err) {
          console.log(err);
        }
        printOut(result);
        init(); 
      });
  }else if( answers.mainPage === 'view all roles'){
    clearS = 1;
    sequelize.query('SELECT role.id,role.title,role.salary,department.name as Department FROM role JOIN department ON role.department_id = department.id;', function (err, result) {
      if (err) {
        console.log(err);
      }
      printOut(result);
      init(); 
    });
}else if( answers.mainPage === 'view all employees'){
  clearS = 1;
  sequelize.query(`
  SELECT employee.id,employee.first_name,employee.last_name,manager_id,role.title,role.salary,department.name,manager_id
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id;`
  , function (err, result) {
    if (err) {
      console.log(err);
    }
    //console.log(result);
    printOut(result);
    init(); 
  });
}else if( answers.mainPage === 'add a department'){
  clearS = 1;
  depMenu();
}else if( answers.mainPage === 'add a role')
  {
    clearS = 1;
    sequelize.query('SELECT * FROM department;', function (err, result) 
        {
          if (err){
            console.log(err);
          }
          printOut(result);
          RoleMenu();
        })
  }else if( answers.mainPage === 'add an employee'){
    clearS = 1;
    sequelize.query('SELECT role.id,role.title,role.salary,department.name as Department FROM role JOIN department ON role.department_id = department.id;', function (err, result) 
    {
      if (err){
        console.log(err);
      }
      printOut(result);
      EmpMenu();
    })
  }else if( answers.mainPage === 'update an employee role'){
    clearS = 1;
    sequelize.query(`  
    SELECT employee.id,employee.first_name,employee.last_name,manager_id,role.title,role.salary,department.name,manager_id
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id;`, function (err, result) 
    {
      if (err){
        console.log(err);
      }
      printOut(result);
      EmpUpdateMenu();
    })
  }else if( answers.mainPage === 'Exit'){
    exit();
  }else {exit}
} 

//-------------------main prompt-----------------------------
function MainPrompt () {
  if (clearS === 0 ) console.clear();
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
  //console.log(result)
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
    row.Department!=undefined?row.Department+'\t':'',
    row.manager_id!=undefined?row.manager_id+'\t':''
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


//----------------adding department-----------------------
function addDep(answers){
  if(answers.depName ==="" || answers.depName===undefined){        
    console.log('\nEnter a valid value!\n')
    init();
  }else {
    sequelize.query(`INSERT INTO department (name) VALUES ("${answers.depName}");`, function (err, result) {
      if (err) {
      console.log(err);
      }
      console.log('\nRequested department successfuly added to the department list !\n');
      init();
      return;
      });
  }
 }
const DepPrompt = () => {
// let dList = deplist();
return inquirer.prompt([
  {
      //name,ID, email, office_number
      type: 'input',
      name: 'depName',
      message: 'Pleae enter the department name you want to add to the system : ',
  }
]);
};
function depMenu(){
      //console.clear();
      DepPrompt()
          .then((answers) => addDep(answers))
          .catch((err) => console.error(err))
}
//----------------add role part--------------
function addRole(answers){
  if(answers.ID ==="" || answers.title==="" || answers.salary===""){        
    console.log('\nEnter a valid value!\n')
    init();
  }else {
    sequelize.query(`INSERT INTO role (department_id,title,salary) VALUES ("${answers.ID}","${answers.title}","${answers.salary}");`, function (err, result) {
      if (err) {
      console.log(err);
      }
      console.log('\nRequested role successfuly added to the roles !\n');
      init();
      return;
      });
  }
 }
const RolePrompt = () => {
return inquirer.prompt([
    {
        type: 'input',
        name: 'ID',
        message: 'Pleae enter the department ID (from the above list) you want to add role on it : ',
    },
    {
      type: 'input',
      name: 'title',
      message: 'Pleae enter the Role you want to add to the system : ',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Pleae enter the salary for this Role : ',
    }
]);
};
function RoleMenu(){
      //console.clear();
      RolePrompt()
          .then((answers) => addRole(answers))
          .catch((err) => console.error(err))
}

//------------add employee menu-------------------

function addEmp(answers){
  console.clear();
  if(answers.ID ==="" || answers.FName==="" || answers.LName===""|| answers.ManagerID===""){        
    console.log('\nEnter a valid value!\n')
    init();
  }else {
    sequelize.query(`INSERT INTO employee (role_id,first_name,last_name,manager_id) VALUES ("${answers.ID}","${answers.FName}","${answers.LName}","${answers.ManagerID}");`, function (err, result) {
      if (err) {
        console.log(err);
        }
        console.log('\nRequested Employee successfuly added to the employee list !\n');
        init();
        return;
        });
      }
 }
const EmpPrompt = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'ID',
      message: 'Pleae enter the Role ID (from the above list) you want to add Employee on it : ',
    },
    {
      type: 'input',
      name: 'FName',
      message: 'Pleae enter new employee first name : ',
    },
    {
      type: 'input',
      name: 'LName',
      message: 'Pleae enter new employee last name : ',
    },
    {
      type: 'input',
      name: 'ManagerID',
      message: 'Pleae enter the manager ID for this employee : ',
    }
]);
};
function EmpMenu(){
      //console.clear();
      EmpPrompt()
          .then((answers) => addEmp(answers))
          .catch((err) => console.error(err))
}
//----------------------EmpUpdateMenu-----------------------------

function updateEmp(answers){
  console.clear();
  if(answers.ID === "" || answers.role_id === ""){        
    console.log('\nEnter a valid value!\n')
    init();
  }else {
    sequelize.query(`
    UPDATE employee
    SET 
        role_id = ${answers.role_id}
    WHERE
        id = ${answers.ID};`, function (err, result) {
      if (err) {
        console.log(err);
        }
        console.log('\nRequested Employee role successfuly edited !\n');
        init();
        return;
        });
      }
 }
const EmpUpdatePrompt = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'ID',
      message: 'Pleae enter the Employee ID (from the above list) you want to update his/her role : ',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Pleae enter new role ID for this employee : ',
    }
]);
};
function EmpUpdateMenu(){
      //console.clear();
      EmpUpdatePrompt()
          .then((answers) => updateEmp(answers))
          .catch((err) => console.error(err))
}