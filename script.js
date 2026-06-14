const   { argv } =  require ('node:process');
const fs =  require('node:fs');
const { table } = require('node:console');



function readTasks(path) {
    if (!fs.existsSync(path)) return [];
    const data = fs.readFileSync(path, 'utf-8');
    return data ? JSON.parse(data) : [];
}

 


const tasks = readTasks('./tasks/tasks.json');






// add list 
if (argv[2] === 'add'){
    if (!argv[3]){
        console.log ('you should add the task');
        
    }else {
        const newId =tasks.length > 0?  Math.max(...tasks.map(task=> task.id ))+1: 1
        tasks.push({id:newId  ,
            description :argv[3],
            status:"todo",
            createdAt : new Date(),
            updatedAt : ''})
        fs.writeFileSync('./tasks/tasks.json',JSON.stringify(tasks,null,2))
        
            console.log (`Task added successfully (ID: ${newId})`)
        }
        
    }

   


    
//uodata list 

if (argv[2] === 'update' ){
    const taskId = Number(argv[3]);
    const task = tasks.find (task => task.id === taskId)
    if (!task ){
        console.log('No description, Enter valid id');
        return
    }

    const newDescription = argv[4];
    task.description = newDescription ;
    task.updatedAt = new Date() ;
    fs.writeFileSync('./tasks/tasks.json',JSON.stringify(tasks,null,2));
    console.log (`Task  updated successfully (ID: ${taskId})`)
} 


//uodata list 

if (argv[2] === 'delete' ){
    const taskId = Number(argv[3]);
    const task = tasks.find (task => task.id === taskId);
    if (!task ){
        console.log('No description, Enter valid id');
        return
    }
    tasks.splice (tasks.indexOf(task) , 1)
  
    fs.writeFileSync('./tasks/tasks.json',JSON.stringify(tasks,null,2));
    console.log (`Task  Deleted successfully (ID: ${taskId})`)
} 

if (argv[2] && argv[2].startsWith('mark')){
    const taskId = Number(argv[3]);
    const task = tasks.find (task => task.id === taskId)
    if (!task ){
        console.log('No description, Enter valid id');
        return
    }
    
    switch (argv[2]){
        case('mark-in-progress'):
            task.status = 'in-progress' ;
            break;
        case ('mark-done'):
            task.status = 'done' ;
            break;
        default :
            console.log ('Enter valid status')
            return;

        

    }

    fs.writeFileSync('./tasks/tasks.json',JSON.stringify(tasks,null,2));
    console.log (`Status Changed successfully (ID: ${taskId})`)
}

if (argv[2]== 'list'){
    switch (argv[3]){
        case ('done'):
            const doneArray = tasks.filter(task => task.status ==="done");
            console.log(doneArray);
            break;
        case('todo'):
            const todoArray = tasks.filter(task => task.status ==="todo");
            console.log(todoArray);
            break;
        case('in-progress'):
            const progressArray = tasks.filter(task => task.status ==="in-progress");
            console.log(progressArray);
            break;
        default:
            console.log(tasks);


    }

}