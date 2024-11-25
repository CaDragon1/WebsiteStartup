import React from 'react';
import './account.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Account() {
    return(
        <main>
            <div className="container mt-4" id="account-block">
                <h3 className="mb-4">My Account</h3>
                <div className="row">
                    {/* Column 1 in the account panel */}
                    <div className="col-md-2 bg-light border" id="account-info">
                        <img src="../../images/profile_placeholder.png" alt="Profie Picture" id="profile-picture" class="img-fluid mb-3" />
                        <br />
                        <button type="button" class="btn btn-secondary" id="change-profile">Change profile image</button>
                    </div>
                    {/* Column 2 in the account panel */}
                    <div className="col-md-5 bg-secondary border" id="change-account">
                        <h4 className="account-name">John_Smith42</h4>
                        <p id="connected-status" style={{color: "rgb(247, 130, 130)"}}>Google account not connected</p>
                        <button type="button" class="btn btn-outline-light" id="link-google">Link Google Account</button>
                        <br />
                        <button type="button" class="btn btn-outline-warning" id="logout">Log out</button>
            
                    </div>
                </div>
            </div>   
        </main>
    );
}