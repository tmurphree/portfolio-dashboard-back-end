# Portfolio Dashboard Back End  

[Click here for Portfolio Dashboard on Heroku](https://tm-portfolio-dashboard.herokuapp.com/)  

## Description

API for my [portfolio dashboard](https://github.com/tmurphree/portfolio-dashboard-front-end) project.  Helps keep things like API keys secret and serves up the Vue.js front end.  

## Setup (assumes you have Node.js installed)  
1. Clone and build [the front end](https://github.com/tmurphree/portfolio-dashboard-front-end).  
2. Get an Alpha Vantage API key [link](https://www.alphavantage.co/).  
3. Clone this repo.  
4. Create an .env file.  Create an ALPHA_VANTAGE_API_KEY variable, set it to the value obtained in step 2.  
5. Copy the `dist` folder from the front end (that you cloned in step 1) to `public` in this repo.
6. Run `npm install`.    
7. Run `npm start`.  

## Making Changes  
Fork this repo and submit a pull request.  Pull requests with passing unit tests are 100% more likely to be merged into the project.  

## Business Problem Solved
Graphically represent business data.  

## Technologies Used
* Docker  
* Node.js, Express  
* Eslint to keep things consistent and safer  
* Jasmine test-driven developmet (TDD)  

## APIs  
* Alpha Vantage stock price API  

## Future Implementations  
* Upload data from csv files  
* Google and local authentication  
* Two factor authentication  