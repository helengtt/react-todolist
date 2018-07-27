import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.deleteTask=this.deleteTask.bind(this);
        this.toggleComplete=this.toggleComplete.bind(this);
    }
    
    // get the task id of checkbox changed and pass to complete toggle handler
    toggleComplete() {
        this.props.getCompletedId(this.props.taskId);
    }

    // get the deleted task id and pass to delete handler
    deleteTask(){
        this.props.getDeletedId(this.props.taskId);
        console.log('get the deleted Id ' + this.props.taskId + ' successfully');
    }

    render () {
        let task = this.props.listItem.task;
        // indicate the completed tasks properly
        let itemClasses = "listgroup__item";
        let itemChecked;
        if (this.props.complete === true) {
            task = <s>{task}</s>;
            itemChecked = true;
            itemClasses += " listgroup__item__checked";
        }else{
            itemChecked = false;
        };

        return (
        <li className = {itemClasses}>
            <input className="checkbox" type="checkbox" checked={itemChecked} onChange={this.toggleComplete} />
            <div className="listgroup__task">
                {task}
            </div>
            <button className="btn__delete" type="button" onClick={this.deleteTask} >delete</button>
        </li>
        );
    }
}

class TodoFooter extends React.Component {
    render () {
        // statistic the total tasks and the completed tasks
        const totalCount = this.props.data.length || 0;
        const completeCount = this.props.data.filter (listItem => listItem.complete === true).length;

        return (
            <li className="listgroup__item todofooter">{completeCount} is done / {totalCount} in total</li>
        );
    }
}

class TodoList extends React.Component {

    render () {
        const taskList = this.props.data.map((listItem) =>
            <TodoItem 
            key = {listItem.id}
            taskId = {listItem.id}
            listItem={listItem}
            complete={listItem.complete}
            getDeletedId={this.props.getDeletedId}
            getCompletedId={this.props.getCompletedId} />
        );

        return (
            <ul className="list__roup">
                {taskList}
                <TodoFooter data= {this.props.data}/>
            </ul>
        );
    }
}

class TodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.submitTask=this.submitTask.bind(this);
        this.state={value:' '};
    }

    // get the new input task and set as the latest value
    handleChange(e){
        this.setState({value: e.target.value});
    }

    // submit a new task and pass to data
    submitTask(e) {
        e.preventDefault();
        let task = this.state.value.trim();
        console.log('get the new task ' + task + ' successfully');
        if (!task) {
            return ;
        }
        this.props.getTask(task);
        this.state.value='';
    } 

    render () {
        return (
            <form className="form__container" onSubmit={this.submitTask}>
                <div className="form__group">
                    <label className="form__label">Task</label>
                    <input className="form__input" type="text" id="task" value={this.state.value} onChange={this.handleChange} placeholder="What do you want to do?" />
                </div>
                <div className="btn">
                    <button className="btn__task" type="submit" value="Save Task">Save Task</button>
                </div>
            </form>
        );
    }
}

class TodoBox extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggleComplete=this.handleToggleComplete.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            data:[
                {"id": 1, "task": "milk", "complete": false },
                {"id": 2, "task": "bread", "complete": false },
                {"id": 3, "task": "birthday gift", "complete": false },
                {"id": 4, "task": "nappy", "complete": true },
                {"id": 5, "task": "formula", "complete": true }
            ]
        }
    }

    // toggle the task 'complete' state in data by id
    handleToggleComplete(taskId) {
        let data = this.state.data;
        for (let i=0; i<data.length; i++){
            if(data[i].id===taskId) {
                data[i].complete = data[i].complete=== true ? false : true;
                break;
            }
        }
        this.setState({data});
    }

    // delete a task by id and set the latest data in state
    handleDelete(taskId) {
        let data= this.state.data;
        data = data.filter((task) => task.id !== taskId );
        this.setState({data});
    }

    // add a new id for the new task
    maxId(data) {
        let max = data[0].id;
        for(let i = 1; i < data.length; i++) {
            if(data[i].id > max) {
                max = data[i].id;
            }
        }
        return max;
    }
    
    // add a new task item to list and set the latest data in state
    handleSubmit(task){
        let data= this.state.data;
        const id = this.maxId(data)+1;
        data = data.concat ([{"id":id,"task":task, "complete":false}]);
        this.setState({data});
    }

    render () {
        return (
            <div className="todobox__container">
                <h1>To do List</h1>
                <hr/>
                <TodoList
                 data = {this.state.data}
                 getDeletedId={this.handleDelete}
                 getCompletedId={this.handleToggleComplete} />
                <TodoForm
                 getTask={this.handleSubmit} />
            </div>
        );
    }
}

ReactDOM.render(
    <TodoBox />, 
    document.getElementById("root")
);
