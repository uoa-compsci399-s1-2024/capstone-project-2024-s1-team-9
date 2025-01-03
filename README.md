Name of the project: Health Star Rating Calculator

A link to your Project Management tool:
https://uoa-compsci399-s1-2024-team-9.atlassian.net/jira/software/projects/HSROC/boards/1?atlOrigin=eyJpIjoiZDllMzZmYjJkMmJmNGM1ZjkxMjQ4Njk0ZDM5YThiYzAiLCJwIjoiaiJ9

A short description of what the project is about. (You may put a link to your final report here, after it has been completed):

This project is a Health Star rating calculator that takes nutritional information through inputs in the frontend, sends them via API to the backend service which calculates the result and sends it back to the frontend service to be displayed to the user.

Final Report: https://docs.google.com/document/d/1IHHZygtfElmObI-FjI1wm3olV9pes8XA0t9hTUG0MN4/edit?usp=sharing 

Technologies that are used to build the project (include the languages used, the libraries and their versions):
- Node.js
- Express.js
- React
- JavaScript
- CSS

Instructions on how to install and setup the project (specify all dependencies).
Usage Examples (if available):

All instructions are for the main branch

Backend:
> Open the backend folder in command line
> Execute: npm start
> If this doesn't start the backend service then you may need to Execute: npm install then try npm start again. It will then be running on port 3000

Frontend:
> Open frontend folder in command line
> Execute: npm start
> If this doesn't start the web service then you may need to Execute: npm install then try npm start again.

Frontend Notes:
The frontend in the main branch is organised to be deployed and so the API requests are programmed to use the backend service api running on render.com, if you want to run the program locally follow the local deployment instructions.

Instructions for local deployment:
Use this if you don't want to use the hosted web services.
> In the frontend/scr folder find FoodRatingForm, Non_DairyBeverages, and Category Selector .jsx files.
> Replace const BACKEND_URL = 'https://backend-service-5ufi.onrender.com'; at the top with 
const BACKEND_URL = 'http://localhost:3000';
> Once you have done this you can follow the instructions to start the backend first to make sure that it is running on port 3000 and then the frontend. You may need to press Y to accept the frontend to run on a different port, most likely port 3001 (if not 3001 then it may be blocked by CORS). They will use each other to operate the web app.

Contact Jasper: jmac663@aucklanduni.ac.nz at any time if you need support.

URL of the website where the project has been deployed (if applicable):
https://healthstarcalcnz.online

Future Plan (Ideas for future releases):
- Optional accounts to save results
- Continual improvements for frontend code implementation


Acknowledgements (if any) - You can list tutorials used, projects referred to, people consulted etc.
- Cathy McArdle, Client, Food Industry Profesional
- Node.js tutorial: https://www.youtube.com/watch?v=TlB_eWDSMt4
- Express APIs tutorial: https://www.youtube.com/watch?v=pKd0Rpw7O48 
- React Course https://www.youtube.com/watch?v=b9eMGE7QtTk&pp=ygUScmVhY3QgY3Jhc2ggY291cnNl
