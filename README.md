# Portfolio Dashboard Back End

## ⭐ Note: This is an old project ⭐  
This is the back-end service for an early portfolio project, kept public because it's the only side project I have available to show. While I was employed I didn't have much time to work on side projects. If I were building this API today, I would:
* Use TypeScript instead of JavaScript so that I could catch type errors at compile time.
* Use NestJS instead of vanilla Express so that I could use the built-in dependency injection and testing features.
* Mock the Alpha Vantage API responses using Jest so that I could run the tests without hitting the API.
* Use class-validator and class-transformer to validate and transform the request bodies.
* Cache recent quotes for a short time (perhaps with Redis) and send Alpha Vantage requests one at a time so that `/prices/many` would not trip the free-tier call-frequency limit.
* Return real HTTP statuses and one response shape so that a client could tell an unknown symbol, a rate limit, and an upstream failure apart, and both routes would use the same envelope.
* Call Alpha Vantage through a small client that passes the symbol as a query param and reads a single env var so that the API key would not end up in a logged URL and the env var name would match the startup check.

I'm sure there are other things I would do differently, but these are the ones that come to mind.

I'm actively working on an entirely new project.

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

## A note on the unit tests  
If you get the free AlphaVantage API key you can't run all of the unit tests at once.  You'll get call frequency errors (which should probably be 429 errors).  

As a workaround, run one `describe` block at a time.  

## Usage  
### POST /prices/one  
Expects `{ symbol: 'msft' }`.

Returns:  
``` json
{ 
  "error": false,
  "lastRefreshed": "2019-09-09 14:33:00",
  "price": 136.715,
  "symbol": "msft"
}
```

### POST /prices/many
Expects `{ symbol: ['bac', 'msft', 'noSuchSymbol'] }`.  
**NOTE** that the property name is *singular* but has an array of one or more symbols.  I did this to standardize the input and reduce developer fatigue.  


Returns:  
``` json
{
    "payload": [
        {
            "error": false,
            "lastRefreshed": "2019-09-09 14:36:00",
            "price": 28.715,
            "symbol": "bac"
        },
        {
            "error": false,
            "lastRefreshed": "2019-09-09 14:36:00",
            "price": 136.55,
            "symbol": "msft"
        },
        {
            "error": true,
            "errorMessage": "Cannot find price for symbol noSuchSymbol.",
            "symbol": "noSuchSymbol"
        }
    ]
}
```


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
