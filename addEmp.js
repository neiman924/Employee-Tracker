const sequelize = require('./config/connection');
const inquirer = require('inquirer');
const mainP = require('./server.js');
const { title, exit } = require('process');


function addEmp(answers){
  console.clear();
  if(answers.ID ==="" || answers.FName==="" || answers.LName===""|| answers.ManagerID===""){        
    console.log('\nEnter a valid value!\n')
    init();
  }else {
    sequelize.query(`INSERT INTO employee (role_id,first_name,last_name,manager_id) VALUES ("${answers.ID}","${answers.title}","${answers.salary}","${answers.manager_id}");`, function (err, result) {
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

module.exports = {
    EmpMenu
  }

  //DELETE FROM `organization_db`.`department` WHERE (`id` = '6');