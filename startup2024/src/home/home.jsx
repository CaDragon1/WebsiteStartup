import React, { useState, useContext, useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import { CalendarContext } from '../main';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Including fullcalendar from fullcalendar.io to display the user's Google Calendar
// Also including useEffect so that the app can load the user's calendar on the side.

export function Home() {
    // Goal list and completed goal list set
    const [goals, setGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    // States for controlling various objects' visibilities
    const [addNewGoal, setAddNewGoal] = useState(false);
    // const [expandInfo, setExpandInfo] = useState(null);

    // Adding calendar components
    const calendarApi = useContext(CalendarContext);
    const [event, setEvent] = useState([]);
    const [signedIn, setSignedIn] = useState(false);
    const calendarRef = useRef(null);

    // UseEffect function. This bit was complicated and unfamiliar, so I had an AI help me figure out how to use useEffect. The ref was added when I realized I installed the core package for fullcalendar, not the react package. Things didn't work.
    useEffect(() => {
        if (signedIn && calendarRef.current) {
            const calendar = new Calendar(calendarRef.current, {
                plugins: [dayGridPlugin],
                initialView: "dayGridMonth",
                events: event.map(e => ({
                    title: e.summary,
                    start: e.starte.dateTime || e.start.date,
                    end: e.end.dateTime || e.end.date,
                }))
            });
            calendar.render();

            // Destroy the calendar when done with it
            return () => {
                calendar.destroy();
            };
        }
    }, [signedIn, event]);

    // Now I need a function to grab the events from someone's Google calendar. I'm using documentation to help learn about the api and AI to explain the relevant documentation.
    const getEvents = async () => {
        // error handling because it broke without it
        try {
            const primaryEvents = await calendarApi.listUpcomingEvents(20);
            setEvent(primaryEvents.result.items);
        } catch(error) {
            console.error("Error getting events from calendar: ", error)
        }
    }

    const signIn = () => {
        calendarApi.handleAuthClick();
    }

    // Use the setGoals (setState) function of useState to update the list of goals. 
    // Pulling a user's goal list from a database dependent on the user will happen later in development.
    function addGoal(goal) {
        setGoals([...goals, goal]);
    };

    // Function to display a goal list. I learned how to use the .map() function for this. 
    // Also learned that there is a <strong> tag that typically does what <b> does, but can be changed for better styling.
    // I can dynamically change a className, allowing for better css styling.
    function displayGoalList() {
        return (
            <ul className = "goal-list list-unstyled">
                {goals.map((goal, index) => (
                    <React.Fragment key={index}>
                    <li key={index} className = "goal-list-object">
                        <p className = "h5">{goal.title}</p>
                        <div className="button-container">
                            <button className = "btn btn-outline-dark" id="info-button" onClick={() => expandGoal(goal)} >view info</button>
                            <button className = "btn btn-outline-success" id="complete-button" onClick={() => completeGoal(goal.title)}>complete</button>
                        </div>
                    </li>
                    {goal.expanded && (
                        <li className = "goal-info bg-light p-3 mb-3 rounded">
                            <div className='row'>
                                <div className = "col-md-6">
                                    <p><strong>DUE: </strong>{goal.deadline}</p>
                                </div>
                                <div className = "col-md-6">
                                    <span className = {`${goal.completed ? "bg-success" : "bg-warning"}`}>
                                        {goal.completed ? "Completed" : "Not Complete"}
                                    </span>
                                </div>
                            </div>
                            <div className='row'>
                                <div className = "col-md-6">
                                    <p>date created: {goal.dateCreated}</p>
                                </div>
                                
                                <div className = "col-md-6">
                                    <button className="btn btn-danger" onClick={() => removeGoal(goal.title)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    )}
                    </React.Fragment>
                ))}
            </ul>
        );
    }

    // Function to change the expanded trigger in a goal object
    function expandGoal(goalObject) {
        setGoals(goals.map((e) => e.title === goalObject.title ? {...e, expanded: !e.expanded, 
            deadline: e.deadline instanceof Date ? e.deadline.toLocaleDateString() : e.deadline,
        dateCreated: e.dateCreated instanceof Date ? e.dateCreated.toLocaleDateString() : e.dateCreated} : e))
    }
    
    // Function to show the options for creating a new goal
    function NewGoal({onSubmit, cancel}) {
        const [title, setTitle] = useState("");
        const [deadline, setDeadline] = useState("");
        
        // Subfunction for submission because I can't figure out how to separate it from the function
        function Submit() {
            onSubmit(createGoal(title, new Date(deadline)));
            // I clear the text field and deadline as indication that the goal submitted
            setTitle("");
            setDeadline("");
        }

        return (
            <form onSubmit={Submit}>
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
            completed: false,
            expanded: false
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
                            <button type="button" className="btn btn-outline-primary" onClick={() => setAddNewGoal(true)}>New Goal</button>
                            {addNewGoal && (
                                <NewGoal onSubmit={(goal) => {addGoal(goal);
                                    setAddNewGoal(false);
                                }}
                                cancel={() => setAddNewGoal(false)}
                                />)
                            }
                        </div>
                    </nav>
                    {displayGoalList()}
                </div>

                <div className="google-calendar">
                    {signedIn ? (
                        <div ref={ calendarRef }></div>) 
                        : ( 
                        <div>
                            <p className="signin-message">Sign in to your google account for calendar integration!</p>
                            <button type="button" className="btn btn-success" onClick={signIn}>Connect Google Account</button>
                        </div>
                    )}
                </div>
            </main>

        </>
    );
}