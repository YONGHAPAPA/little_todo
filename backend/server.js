const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const origins = [
    'http://localhost:3000'
];
const corsOption = {
    origin:origins, 
    credentials:true
};
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(session({
    secret:'asdf1234', 
    resave:false, 
    saveUninitialized:true, 
    cookie:{
        maxAge:600000, 
        secure:false, 
        httpOnly:false
    }
}));
app.use(cors(corsOption));
app.use(bodyParser.json());

let connString = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/todo_db?retryWrites=true&w=majority";
mongoose.connect(connString, {useNewUrlParser:true, useUnifiedTopology:true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established successfully.");
})

todoRoutes.route("/").get(function(req, res){
    Todo.find(function(err, result){
        if(err){
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

todoRoutes.route("/update/:id").post(function(req, res){
    Todo.findById(req.params.id, function(err, result){
        if(!result){
            res.status(404).send("data is not found.");
        } else {
            result.todo_description = req.body.todo_description;
            result.todo_responsible = req.body.todo_responsible;
            result.todo_priority = req.body.todo_priority;
            result.todo_completed = req.body.todo_completed;

            result.save().then(todo => {
                res.json('Todo updated.');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

todoRoutes.route('/add').post(function(req, res){

    console.log(req.body);

    let todo = new Todo(req.body);
    todo.save().then(todo=>{

        //console.log(req.body);
        res.status(200).json({'todo':'todo added successfully'})
    }).catch(err=>res.status(400).send('adding new todo failed.'));
});

todoRoutes.route('/createsession').post(function(req, res){
    
    console.log('/createsession >>>>>');
    console.log(req.body);

    req.session.name = 'test';
    req.session.save(()=>{
        res.send({result:req.session.name});
    });


    
});

todoRoutes.route('/checksession').post(function(req, res){
    
    console.log('/checksession >>>>>');
    console.log(req.session);
    //console.log(req.session.name);

    if(req.session.name){
        res.send({result:req.session.name});
    } else {
        res.send({result:'need login'});
    }
});

app.use('/todos', todoRoutes);

app.listen(PORT, function(){
    console.log("Server is running on Port : " + PORT);  
});