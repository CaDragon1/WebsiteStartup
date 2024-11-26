import React, { useState } from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Home() {
    // Goal list and completed goal list set
    const [goals, setGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    // States for controlling various objects' visibilities
    const [addNewGoal, setAddNewGoal] = useState(false);

    // Use the setGoals (setState) function of useState to update the list of goals. 
    // Pulling a user's goal list from a database dependent on the user will happen later in development.
    function addGoal(goal) {
        setGoals([...goals, goal]);
    };

    // Function to display a goal list. I learned how to use the .map() function for this.
    function displayGoalList() {
        return (
            <ul className = "goal-list">
                {goals.map((goal, index) => (
                    <li key={index} className = "goal-list-object">
                        {goal.title}
                        <button className = "btn btn-outline-dark" onClick={() =>} >view info</button>
                        <button className = "btn btn-outline-success" onClick={() => completeGoal(goal.title)}>complete</button>
                    </li>
                ))}
            </ul>
        );
    }
    
    // Function to show the options for creating a new goal
    function newGoal({submit, cancel}) {
        const [title, setTitle] = useState("");
        const [deadline, setDeadline] = useState("");
        
        // Subfunction for submission because I can't figure out how to separate it from the function
        function Submit() {
            submit(createGoal(title, new DataTransfer(deadline)));
            // I clear the text field and deadline as indication that the goal submitted
            setTitle("");
            setDeadline("");
        }

        return (
            <form submit={Submit}>
                <input type="text" value={title} onChange={(typed) => setTitle(typed.target.value)} placeholder="Goal Title" required/>
                <input type="date" value={deadline} onChange={(selected) => setDeadline(selected.target.value)}/>
            <button type="submit">Add New Goal</button>
            <button type="button" onClick = {cancel}>Cancel</button>
            </form>
        );
    }

    // Function to create a new goal object. 
    // Turns out, adding a goal id only works for manipulation if we do some hashing to make it unique, so I'll use the title for removal instead.
    function createGoal(title, deadline) {
        return {
            title,
            deadline,
            dateCreated: new Date(),
            completed: false
        };
    };

    // Function to remove a goal from the list. If there are multiple goals with the same title, they all get removed. Known bug that will be fixed later.
    // I'm trying to use arrow functions more because I don't fully understand them.
    function removeGoal(goalTitle) {
        return (setGoals(goals.filter(goal => goal.title != goalTitle)));
    }

    // Function to mark a goal as complete and move it to a separate list
    function completeGoal(goalTitle) {
        const completedGoal = goals.find(goal => goal.title === goalTitle);
        completedGoal.completed = true;
        setCompletedGoals([...completedGoals, completedGoal]);
        removeGoal(goalTitle);
    }

    return(
        <>
            <main>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="goal-menu">
                        <div className="goal-list">Current Goals
                            <button type="button" className="btn btn-outline-primary" onClick={() => newGoal(true)}>New Goal</button>
                        </div>
                    </nav>
                    
                </div>

                <div className="google-calendar">Google Calendar Placeholder</div>
            </main>

            <footer>
                <a href="https://github.com/CaDragon1/startup" target="_blank" style="font-size: 18px; color:rgb(0, 0, 0); font-weight: bold;">Github Repository</a>  
            </footer>
        </>
    );
}