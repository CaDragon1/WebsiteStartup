import React, { useState } from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Home() {
    // Goal list and completed goal list set
    const [goals, setGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);

    // Use the setGoals (setState) function of useState to update the list of goals. 
    // Pulling a user's goal list from a database dependent on the user will happen later in development.
    function addGoal(goal) {
        setGoals([...goals, goal]);
    };

    // Function to create a new goal object. 
    // Turns out, adding a goal id only works for manipulation if we do some hashing to make it unique, so I'll use the title for removal instead.
    function createGoal(title, deadline) {
        return {
            title,
            deadline,
            dateCreated = new Date(),
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
        // <main>
        //     <div className="container-fluid">
        //         <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="goal-menu">
        //             <div className="goal-list">Current Goals
        //                 <button type="button" className="btn btn-outline-primary" data-toggle="button">New Goal</button>
        //             </div>
        //         </nav>
        //         <ul className="list-group">
        //             <li className="list-group-item">Goal 1
        //                 <button className="btn btn-outline-dark">view info</button>
        //                 <button className="btn btn-outline-danger">delete</button>
        //                 <button className="btn btn-outline-success">complete</button>
        //             </li>
        //             <li className="list-group-item">Goal 2
        //                 <button className="btn btn-outline-dark">view info</button>
        //                 <button className="btn btn-outline-danger">delete</button>
        //                 <button className="btn btn-outline-success">complete</button>
        //             </li>
        //             <li className="list-group-item">Goal 3
        //                 <button className="btn btn-outline-dark">view info</button>
        //                 <button className="btn btn-outline-danger">delete</button>
        //                 <button className="btn btn-outline-success">complete</button>
        //             </li>
        //             <li className="list-group-item">Goal 4
        //                 <button className="btn btn-outline-dark">view info</button>
        //                 <button className="btn btn-outline-danger">delete</button>
        //                 <button className="btn btn-outline-success">complete</button>
        //             </li>
        //         </ul>
        //     </div>

        //     <div className="google-calendar">Google Calendar Placeholder</div>
        // </main>

        // <footer>
        //     <a href="https://github.com/CaDragon1/startup" target="_blank" style="font-size: 18px; color:rgb(0, 0, 0); font-weight: bold;">Github Repository</a>  
        // </footer>
    );
}