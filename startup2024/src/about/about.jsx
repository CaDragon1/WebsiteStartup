import React from 'react';
import './about.css';

export function About() {
    return (
        <>
        <h2 className="mb-4" id="about">About</h2>
        <main className = "container">
            
            <div className="row justify-content-center">
                <div className="col-md-10 bg-light border p-3 mb-3" id="about-website">
                    <p>This website is a practical implementation of a personal progress tracker linked to a Google calendar, created by Caleb Drake.</p>
                    <p>The end goal is to, someday, expand upon this concept to harness addictive app design into an app that encourages users to set and accomplish goals,
                    create a daily journal, and improve themselves.</p>
                    <a href="https://github.com/CaDragon1/WebsiteStartup">My Github Repository</a>
                </div>  
                
            </div>  
        </main>
        </>
        
    );
}