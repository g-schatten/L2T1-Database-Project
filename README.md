# L2T1-Database_Project

this is a codeforces like react app made with PERN stack.

to run this code, you need to restore the databse "codeforces" to run this application.

after this, go to `/server/db/db.js` and change the password to your password.


**step 1: setup server folder**

`cd server`, then `npm init`

**step 2: install packages**

in the same directory, `npm install pg cors express bcrypt nodemon jsonwebtoken jwt-decode`


**step 3: setup client folder**

`cd client`, then `npm init` (if you are in /server directory then do `cd..` first)

**step 4: install packages**

in the same directory, `npm install react react-dom react-router-dom`


now, you are all setup. open two terminals. one directed in `/server` and another in `/client/src`.


**in server side:** `nodemon server`

**in client side:** `npm start`

