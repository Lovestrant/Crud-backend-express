const Joi =require('joi');
const express = require('express');
const app = express();
app.use(express.json());
//crud
// List many items GET/todos
//List one item GET/todos/:id
//create a new item POST  /todos
//editing PUT /todos/:id
//Deleting one item DELETE /todos/:id


let todos = [
    {id:1,
      name: "breakfast"  
    },
    {
        id:2,
        name: "lunch"
    },
    {
        id: 3,
        name: "coding javascript"
    }
]

app.get('/', (req, res)=>{
res.send('I am running on port 7000');
});

app.get('/todos', function(req, res) {
    console.log(todos),
     res.send(todos)
});

app.get('/posts/todos/:id/:name', (req, res)=> {
    res.send(req.params);
});

app.post('/api/todos', (req,res) => {
    let todos = {
        id: todos.length + 1,
        name: req.body.name
    };
    todos.push(todos);
    res.send(todos);
});


app.put('/api/todos/:id', (req,res) => {
const todos = todos.find(todos => todos.id === parseInt(req.params.id));
if(!todos) res.status(404).send('todos with that id not found');

const Schema= {
    name: Joi.string.name().min(3).required()
};
const result =Joi.validate(req.body, Schema);
if(result.error){
    res.status(404).send(result.error.details[0].message);
    return;
}
todos.name = req.body.name;
res.send(todos);
});

app.delete('/todos/:id', (req, res) =>{
    const todos = todos.find(todos => todos.id === parseInt(req.params.id));
    if(!todos) res.status(404).send('todos with that id not found');
    const index= todos.indexOf(todos);
    todos.splice(index, 1);
    res.send(todos);
});


app.listen(7000,  ()=>{
    console.log("hello world");
}

)