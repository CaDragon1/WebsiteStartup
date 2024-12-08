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
        setEntry(entry.filter(entry => entry.dateCreated.getTime() !== dateRemoval.getTime()));
    }

    // Function for the journal form displayed on the right
    function journalForm() {
        
        // What do do on submit
        const submission = (enter) => {
            // Apparently the "default" behavior for a browser is to reload the page, so I don't want that.
            enter.preventDefault();
            // Check that there is info in title and entry
            if(title.trim() && formEntry.trim()){
                addEntry(title, formEntry)
                setTitle("");
                setFormEntry("");
            }
        };

        return (
            <form onSubmit={submission} className='journal-form'>
                <div id="title-container">
                    <input type="text" id="title" value={title} onChange={(submission) => setTitle(submission.target.value)} placeholder='Enter title' required />
                </div>
                <div id="form-container">
                    <textarea id="journal-form" value={formEntry} onChange={(submission) => setFormEntry(submission.target.value)} placeholder='Write journal entry' required />
                    
                </div>
                <div className="form-buttons">
                    <button type="button" className="btn btn-outline-primary" onClick={() => {setTitle(''); setFormEntry('');}}>Clear</button>
                    <button type="button" className="btn btn-primary" onClick={() => {addEntry(title, formEntry); setTitle(''); setFormEntry('');}}>Create Entry</button>
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
        <>
        <h1 className="page-title">My Notebook</h1>
        <main>
            <div className = "journal-container">
                <div className = "journal-list">
                    <ul>
                        {entry.map((e) => 
                            <ul key={e.dateCreated} >
                                <h3 className="clickable-title" onClick={() => expandEntry(e.dateCreated)}>{e.title}</h3>
                                <p>{e.dateCreated.toLocaleDateString()}</p>

                                {e.expanded && (
                                    <div className="expanded-entry">
                                        <p>{e.journalEntry}</p>
                                        <button type="button" className = "btn btn-danger" onClick={() => removeEntry(e.dateCreated)}>Delete</button>
                                    </div>
                                )}
                            </ul>
                        )}
                    </ul>
                </div>
            </div>
            <div className = "journal-form">
                {journalForm()}
            </div>
        </main>
        </>
    );
}