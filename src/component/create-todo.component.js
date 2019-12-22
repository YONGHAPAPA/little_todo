import React, {Component} from 'react';
import axios from 'axios';

export default class CreateToDo extends Component {

    constructor(props){
        super(props);

        //bind event
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state
        this.state = {
            todo_description : '', 
            todo_responsible : '', 
            todo_priority : '', 
            todo_completed : false
        }
    }

    onChangeTodoDescription(e){
        //console.log("change desciption")
        this.setState({
            todo_description : e.target.value
        });
    }

    onChangeTodoResponsible(e){
        this.setState({
            todo_responsible : e.target.value
        });
    }

    onChangeTodoPriority(e){
        this.setState({
            todo_priority : e.target.value
        });
        //console.log("Priority : " + this.state.todo_priority);
    }

    onSubmit(e){
        e.preventDefault();

        console.log('form submitted.');
        console.log(`todo desc : ${this.state.todo_description}`);
        console.log(`todo Resp : ${this.state.todo_responsible}`);
        console.log(`todo Priority : ${this.state.todo_priority}`);

        const newTodo = {
            todo_description : this.state.todo_description, 
            todo_responsible : this.state.todo_responsible, 
            todo_priority : this.state.todo_priority, 
            todo_completed : this.state.todo_completed
        }

        axios.post('http://localhost:4000/todos/add', newTodo).then(res => console.log(res.data));

        this.setState({
            todo_description : '', 
            todo_responsible : '', 
            todo_priority : '', 
            todo_completed : false
        });
    }


    onClick_CreateSession(){
        console.log("onClick_CreateSession");

        const postdata = {
            method:"POST", 
            headers:{
                'Accept':'application/json', 
                'Content-Type':'application/json', 
                'Cache':'no-cache'
            }, 
            credentials:'include', 
            body:JSON.stringify({name:'test', email:'test@gmail.com'})
        }

        //axios.get('http://localhost:4000/todos/createsession', {name:'test', email:'test@gmail.com'}).then(res => console.log(res.data));
        fetch('http://localhost:4000/todos/createsession', postdata).then((res) => res.json()).then((resJson) => {
            console.log(resJson);
        }).catch(err => {
            console.log(err);
        })
    }

    onClick_CheckSession(){
        console.log("onClick_CheckSession");

        const header = {
            method:"POST", 
            headers:{
                'Accept':'application/json', 
                'Content-Type':'application/json', 
                'Cache':'no-cache'
            }, 
            credentials:'include'
        }

        //axios.get('http://localhost:4000/todos/checksession').then(res => console.log(res.data));

        fetch('http://localhost:4000/todos/checksession', header).then((res) => res.json()).then((resJson) => {
            console.log(JSON.stringify(resJson));
        }).catch(err => {
            console.log(err);
        })
    }



    render(){
        return(
            <div style={{marginTop:10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description : </label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Responsible : </label>
                        <input type="text" className="form-control" value={this.state.todo_responsible} onChange={this.onChangeTodoResponsible}/>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   name="priorityOptions"
                                   id="priorityLow"
                                   value="Low"
                                   checked={this.state.todo_priority === "Low"}
                                   onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.todo_priority === "Medium"}
                                    onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.todo_priority === "High"}
                                    onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />

                        <input type="button" value="create session" className="btn btn-primary" onClick={this.onClick_CreateSession} />
                        <input type="button" value="check session" className="btn btn-primary" onClick={this.onClick_CheckSession} />
                    </div>
                </form>
            </div>
        );
    }
}