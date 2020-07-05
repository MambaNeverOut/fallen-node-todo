#!/usr/bin/env node
const program  = require('commander');
const api = require('./index.js')
const pkg = require('./package.json')

program.version(pkg.version)
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    console.log(words);
    api.add(words).then(()=>{console.log('添加成功');
    }, ()=>{
      console.log('添加失败');
      
    })
    // const words = args[args.length-1].join(' ')
    // api.add(words).then(()=>{console.log('添加成功');
    // },()=>{
    //   console.log('添加失败');
      
    // })
  });
  
  program
  .command('clear')
  .description('clear task')
  .action((...args) => {
    api.clear().then(()=>{
      console.log('清除完毕');
      
    },()=>{
      console.log('清除失败');
      
    })
  });

  // program.command('showAll').description('show all task')
  // .action(()=>{
  //   if(process.argv.length === 2){
  //     api.showAll()
  //     console.log('123');
  //   }
  // })
  
  if(process.argv.length === 2){
    api.showAll()
  }

  program.parse(process.argv);

  

