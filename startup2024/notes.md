# Startup
9/11/24 Created an EC2 website using AWS, set up with the class' default Ubuntu package.

**This assignment has taught me:**

9/13/24
- How to generate an SSH key
- How to connect my repositories to the CygWin shell
    *This is more of a re-learning thing than a new thing.*
- Better merge conflict strategies

9/22/24
- Caddyfile is case-sensitive
- If you screw up editing the caddy file, fixing it is currently outside my skillset. 
- Learned how to attach a domain name to my ec2 instance
- Also learned how to terminate an ec2 instance and release an elastic ip
- I kinda messed up but starting over helped me understand the process better

10/1/24
- HTML docs begin with the <!DOCTYPE html> tag and can contain <head>, <body>, and numerous other sub-categories
- To ssh into your website, use ssh -i "$key" ubuntu@$hostname
- css can target specific areas in html by targeting the class given to segments
- css animation is done with the @keyframes tag

HTML
- Span elements are used to group and style inline elements without changing appearance or structure
- <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>
- Links:
<a href="url.com">linktext</a>
<img src="image.jpg">

CSS
- #idname selects named id element
- [attribute] selects named attribute elements
- Display properties:
display: block;
display: inline;
display: inline-block;
display: flex;
display: grid;
- Positions: 
position: static/relative/absolute/fixed;
- flexbox (1-dimensional layout):
.container { 
    display: flex; // then you can justify-content and align-items
}
- Grid (2-dimensional layout):
display: grid;
grid-template-columns: 1fr 1fr 1fr;
gap: 10px;

Bootstrap
- The class name can determine what your code does, such as <nav class="navbar navbar-expand-lg navbar-light bg-light">.
- data-target="#target" specifies what content is affected (my example was a button that collapses/expands text)

Javascript // remember the fundies
- 'let' for reassignable vars
- 'const' for constants
- Creating objects
const thingy = {
    name: 'burlap',
    amount: 3,
    function doSomething(param) {
        return param--;
    }
};
- Make array
const myArray = ['turkey', 'cranberry sauce', 'pie'];
console.log(myArray[1]); // console.log is annoying :(
myArray.push('stuffing');
- for loops
for (let i = 0; i < n; i++){
}
//there's also "do while" loop on top of a "while" loop, I always forget this
- Interact with HTML Document Object Model (DOM)
const element = document.getElementByClassName('status-bar'); //can also do ById()
element.innerHTML = 'new data';
element.style.color = 'blue';
const newDiv = documnent.createElement('div');
document.body.appendChild(newDiv);
element.addEventListener('click', myFunction(){
    console.log('*click*');
});

Filetypes
- file.type contains the MIME type of a given file (such as image/jpeg) and, therefore, you can use substr() method to extract characters from this string to tell what type a file has.
- If uploading a file, it's good practice to also create a temporary URL for preview purposes. You can use the URL.createObjectURL(file) function to create a preview url.

API Calls
- Context providers are a cool way of enclosing your html to provide access to the api through the app. Example:
    import React, { createContext } from 'react';
    export const CalendarContext = createContext(null);
    <CalendarContext.Provider value={apiCalendar}>
    </CalendarContext.Provider>