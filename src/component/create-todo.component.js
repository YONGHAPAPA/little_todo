import React, {Component} from 'react';

export default class CreateToDo extends Component {

    constructor(props){
        super(props);

        //bind event
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);

        //state
        this.state = {
            todo_description : '', 
            todo_responsible : '', 
            todo_priority : '', 
            todo_completed : false
        }
    }

    onChangeTodoDescription(e){
        console.log("change desciption")

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
    }

    onSubmit(e){
        e.preventDefault();

        console.log('form submitted.');
        console.log(`todo desc : ${this.state.todo_description}`);
        console.log(`todo Resp : ${this.state.todo_responsible}`);
        console.log(`todo Priority : ${this.state.todo_priority}`);

        this.setState({
            todo_description : '', 
            todo_responsible : '', 
            todo_priority : '', 
            todo_completed : false
        });
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
                    
                </form>
            </div>
        );
    }
}