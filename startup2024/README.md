# startup2024


## Elevator Pitch

The hardest part of self-improvement is building up new habits. This application intends to support your habits
by incentivizing accomplishing self-made goals. It connects to a user's Google Calendar to give you reminders,
and with each accomplished task, the user gets an increase in their userscore. The userscore is a modular system
that will easily be replaced by an incentive structure popularized by addictive mobile games at a later point,
when assets are created for that purpose.

## Website Mockup
https://ninjamock.com/s/D6J6CLx

![Mockup of application homepage.](/images/Homepage_Mockup.png)

![Mockup of application notebook page.](/images/Notebook_Mockup.png)

![Mockup of application account page.](/images/Account_Mockup.png)

![Mockup of application about page.](/images/About_Mockup.png)

## Key Features
- User-created list of tasks to accomplish/goals to reach
- Google Calendar integration with task list
- Progress report with high score system
- Notebook functionality to personally keep track of progress
- Data persistently stored
- User account system with profile images

## Design
Here is a sequence diagram showing how creating a task, completing a task, and making a notebook entry
would generally work.

![Sequence Diagram for main functionality](/images/Self_Improvement_Application.png)

## Technologies

- HTML - Four HTML pages. One simple "about" page, one "my account" page, one "notebook" page, and one "home" page with the tasklist. Hyperlinks between pages.
- CSS - Content is adjusted so that all elements fit on different screens, styled around a clean minimalist aesthetic
- React - Trying to save tasks will prompt a login/register overlay that will include an option to connect Google Calendar. Relevant elements update upon creation and completion of tasks, changing account information, and notebook entries.
- Service - Backend service. Endpoints include:
    - Login, logout, register: POST
    - Tasks: GET, POST, PUT, DELETE 
    - Notebook entries: GET, POST, PUT, DELETE 
    - Google Calendar: POST, GET, DELETE
    - User Profile: GET, PUT, DELETE
- DB/Login - We should be using MongoDB or something similar to store users, tasks, and notebook data securely in a database. Login required for functionality.
- WebSocket - Connects to Google Calendar using Google's API to retrieve tasks and create tasks. Displays user's calendar on the home page. Updates statistics when user completes a task.



## Initial Implementation
9/30/2024
- Pages are set up as follows: 
    - index.html (Home page)
    - notebook.html (Journal page)
    - account.html (Account page)
    - about.html (About page)
    Each of these pages contains placeholders for the content they will house.
- Content is separated into classes for easier css implementation in the future
- Added deployFiles.sh to assist in deployment
- My initial plan leaves out the graph of individual progress shown in my elevator pitch. This is to simplify version 1.0.

## Additional

[Other notes regarding this project](docs/notes.md)