 const db = require('./db.js')
const inquirer = require('inquirer');


module.exports.add = async function(title){
  // 读取之前的任务
  const list = await db.read()
  // 添加任务
  list.push({title:title, done: false})
  // 存储任务到文件中
  await db.write(list)
}

module.exports.clear = async function(title){
  await db.write([])
}

function printTasks (list){
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'index',
      message: '请选择你想操作的任务',
      choices: [{name:'退出',value: '-1'}, ...list.map((task, index)=>{
        return {name:`${task.done? '[x]':'[_]'} ${index+1}-${task.title}`, value:index.toString()}
      }), {name:'+ 添加任务', value: '-2'}]
    }
  ])
  .then((answers) => {
    const index = parseInt(answers.index)
    
    if(index >= 0){
      // 选中一个任务
      // askForAction
      askForAction(list, index)
    }else if(index === -2){
      // 添加任务
      askForCreateTask(list)
    }
  });
}

function askForAction(list, index){
  const actions = {markAsDone, markAsUndone, remove, updateTitle}
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: '请选择你想操作的任务',
      choices: [{name:'退出',value: 'quit'},
        {name:'已完成', value: 'markAsDone'},
        {name:'未完成', value: 'markAsUndone'},
        {name:'修改标题', value:'updateTitle'},
        {name:'删除', value:'remove'},
      ]
    }
  ]).then(answers2 => {
    const action = actions[answers2.action]
    action && action(list, index)
    // switch (answers2.action){
    //   case 'quit':
    //     break;
    //   case 'markAsDone':
    //     markAsDone(list, index)
    //     break;
    //   case 'markAsUndone':
    //     markAsUndone(list, index)
    //     break;
    //   case 'updateTitle':
    //     updateTitle(list,index)
    //     break;
    //   case 'remove':
    //     remove(list,index)
    //     break;
    // }
  })
}

function markAsDone(list, index){
  list[index].done = true
  db.write(list)
}

function markAsUndone(list, index){
  list[index].done = false
  db.write(list)
}

function updateTitle(list, index){
  inquirer
  .prompt({type: 'input', name: 'title', message: '新的标题是：',default: list[index].title})
  .then(answers3 => {
    list[index].title = answers3.title
    db.write(list)
  })
}

function remove(list, index){
  list.splice(index, 1)
  db.write(list)
}

function askForCreateTask(list){
  inquirer
  .prompt({type: 'input', name: 'title', message:'任务标题是：'})
  .then(answers => {
    console.log(answers.title);
    list.push({title:answers.title, done: false})
    db.write(list)
  })
}

module.exports.showAll = async function(){
  // 读取之前的任务
  const list = await db.read()
  // 打印之前的任务
  printTasks(list)
}




