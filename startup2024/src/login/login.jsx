import React from 'react';
// This login screen is copied from the Simon folder.
// A replacement will be made if needed to fit the website, but for now this is a placeholder.
export function Login(){
    return(
    <main className="container-fluid bg-secondary text-center">
        <div>
            <h1>Please enter your login info!</h1>
            <form method="get" action="home.html">
                <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input className="form-control" type="text" placeholder="your@email.com" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" type="password" placeholder="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="submit" className="btn btn-secondary">Create</button>
            </form>
        </div>
    </main>
    )
}