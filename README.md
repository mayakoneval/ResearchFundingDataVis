Using a Minimal React Starter
---

A starter project with [React](https://facebook.github.io/react/), [Babel](http://babeljs.io/), and [Webpack](http://webpack.github.io/).

The React base of this project as a starter is as minimal as possible while still including Babel and Webpack.


Setup
---

clone this repo into your github using the terminal command `git clone https://github.com/mayakoneval/ResearchFundingDataVis`

cd into it 

copy the correct CSV file into a new folder src/data



     ```
Run  npm install
     ```

Usage
---

once in the base directory (the directory that has all of your files, but no files are at a higler level than this directory), 

run

1. `npm start` --> this will start a python server to host the csv and a node server to run your web app

2. Open [http://localhost:8080/](http://localhost:8080/).

3. In the web development tools (in Chrome, right click and inspect) in console, you should see an array of many thousands of objects. Each of these is a row in the PDF translated into an object, some have primary sponsors and some don't, just like the pdf. I am in the process of transforming this data into something more usable. My goal is to have an array of JSON objects of Primary Sponsors with their total contributions, then work on an overall/high level sunburst chart from there


What does this file do? (IMPORTANT FILES TO UNDERSTAND)
___

Step 1 to understand the setup of this web app is to understand [this minimal react starter](https://github.com/ahfarmer/minimal-react-starter). There is a [tutorial I followed](https://www.javascriptstuff.com/build-your-own-starter/#0-intro) to set up a minimal react starter, [this github](https://github.com/ahfarmer/minimal-react-starter) is the result.

server.js - Runs a Node server using Express and Webpack on port 8080

package.json - when you run npm _____ (some command) this file finds what script to run. For example, if you go into this file you will see that on npm start I have told our app to run two scripts in parallel, one sets up the python server to host the CSV so we can "GET" it with http when we need it in our app, and one runs a node server to host our webapp

www/index.html - This is the root html file. There is very little here because all we really need is one element with an id so we can place our React code somewhere. The React components hold all of the other html and css code that is rendered.

node_modules - This is updated when you run `npm install`. This is just a folder of modules we have access to in the app. I have edited the react-d3 ones heavily because they are broken with the new versino of React.

src/main.js - Loads the React Component that will show up on your web app - eventually this React component will contain many other React components (graphs, navigations etc...) and they will all render with a single "Launchpad" React component

src/TransformData.js - This is the file I am working on now. Eventually this will be a React component that massages the data into a nice form that we like and calls other React components with this data to form one cohesive page.

all other src files - All of the other components in the src folder are experimental React components. They may be calling react-d3 components that already exist or they may be Frankenstein code from some non React d3 components. ZoomableSunburst is the most interesting.


