import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

class TodoItem extends React.Component {
    render () {
        let task = this.props.listitem.task;
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
            <input className="checkbox" type="checkbox" checked={itemChecked} />
            <div className="listgroup__task">
                {task}
            </div>
            <button className="btn__delete" type="button">Delete</button>
        </li>
        );
    }
}

class TodoFooter extends React.Component {
    render () {
        const totalCount = this.props.data.length || 0;
        const completeCount = this.props.data.filter (item => item.complete === true).length;

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
            listitem={listItem}
            complete={listItem.complete} />
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
    render () {
        return (
            <form className="form__container">
                <div className="form__group">
                    <label className="form__label">Task</label>
                    <input className="form__input" type="text" id="task" placeholder="What do you want to do?"></input>
                </div>
                <div className="btn">
                    <button className="btn__task" type="submit" value="Save Task">Save Task</button>
                </div>
            </form>
        );
    }
}

class TodoBox extends React.Component {
    render () {
        return (
            <div className="todobox__container">
                <h1>To do List</h1>
                <hr/>
                <TodoList data = {DATA} />
                <TodoForm />
            </div>
        );
    }
}

const DATA = [
{"id": 1, "task": "milk", "complete": false },
{"id": 2, "task": "bread", "complete": false },
{"id": 3, "task": "birthday gift", "complete": true }
];

ReactDOM.render(
    <TodoBox />, 
    document.getElementById("root")
);
