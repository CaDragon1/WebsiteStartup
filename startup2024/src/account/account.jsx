import React, { useState } from 'react';
import './account.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Account() {
    // Constants for the profile picture, including a usestate for state changes
    // Storing the file object:
    const [profilePic, setProfilePic] = useState("profile_placeholder.png");
    // Storing an image preview using temporary URL:
    const [tempURL, setTempURL] = useState("/profile_placeholder.png");

    // Functions for handling profile picture
    function changePicture(eventParam) {
        const newPic = eventParam.target.files[0];
        // Check if the given file is a png or jpg
        if (newPic && newPic.substr(0, 5) === "image") {
            setProfilePic(newPic);
            setTempURL(URL.createObjectURL(newPic));
        }
        else {
            setProfilePic("/profile_placeholder.png");
            setTempURL("/profile_placeholder.png");
        }
    }

    return(
        <main>
            <div className="container mt-4" id="account-block">
                <h3 className="mb-4">My Account</h3>
                <div className="row">
                    {/* Column 1 in the account panel */}
                    <div className="col-md-2 bg-light border" id="account-info">
                        <img src={tempURL || "profile_placeholder.png"} alt="Profie Picture" id="profile-picture" class="img-fluid mb-3" />
                        <br />
                        <div className = "input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Change Profile Image...</span>
                            </div>
                        </div>
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