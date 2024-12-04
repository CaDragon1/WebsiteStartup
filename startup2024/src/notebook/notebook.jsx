import React, { useState } from 'react';
import './notebook.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Notebook() {
    // Notebook list
    const [entry, setEntry] = useState([]);
    // Constants used for the journal form
    const [title, setTitle] = useState('');
    const [formEntry, setFormEntry] = useState('');

    // Function for creating an entry object
    function newEntry(title, journalEntry) {
        return {
            title,
            journalEntry,
            dateCreated: new Date(),
            expanded: false
        };
    }

    // Function for adding a new entry
    function addEntry(title, journalEntry) {
        const addedEntry = newEntry(title, journalEntry);
        setEntry([...entry, addedEntry]);
    }

    // Function for removing an entry
    function removeEntry(dateRemoval) {
        return (setEntry(entry.filter(entry => entry.dateCreated != dateRemoval)));
    }

    // Function for the journal form displayed on the right
    function journalForm() {
        
        // What do do on submit
        const submission = (enter) => {
            // Apparently the "default" behavior for a browser is to reload the page, so I don't want that.
            enter.preventDefault();
            // Check that there is info in title and entry
            if(title && formEntry){
                addEntry(title, formEntry)
                setTitle("");
                setFormEntry("");
            }
        };

        return (
            <form onSubmit={submission} className='journal-form'>
                <input type="text" value={title} onChange={(submission) => setTitle(submission.target.value)} placeholder='Enter title' required />
                <textarea value={formEntry} onChange={(submission) => setFormEntry(submission.target.value)} placeholder='Write journal entry' required />
                <div className="form-buttons">
                    <button type="button" className="btn btn-outline-primary" onClick={() => {setTitle(''); setFormEntry('');}}>Clear</button>
                    <button type="button" className="btn btn-primary" onClick={() => addEntry(title, formEntry)}>Create Entry</button>
                </div>
            </form>
        );
    }

    // Function for expanding journal entries
    function expandEntry(dateID) {
        setEntry(entry.map(e => e.dateCreated === dateID ? {...e, expanded: !e.expanded} : e));
    }

    // Fun fact: "journal-list" is a pun. Hope you like it.
    return (
        <div className = "journal-container">
            <div className = "journal-list">
                <h1>My Notebook</h1>
                <ul>
                    {entry.map((e) => 
                        <li key={e.dateCreated} onClick={() => expandEntry(e.dateCreated)}>
                            <h3>{e.title}</h3>
                            <p>{e.dateCreated.toLocaleDateString()}</p>

                            {e.expanded && (
                                <div className="expanded-entry">
                                    <p>{e.journalEntry}</p>
                                    <button type="button" className = "btn btn-danger" onClick={() => removeEntry(e.dateCreated)}>Delete</button>
                                </div>
                            )}
                        </li>
                    )}
                </ul>
            </div>
            <div className = "journal-form">
                {journalForm()}
            </div>
        </div>
    );
}