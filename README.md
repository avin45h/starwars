This project requires you to do the following

- To install dependencies
  - npm install

- To build local assets
  - npm run client
  
- To run express server
  - npm run server
  
The app can be accessed at
http://localhost:3000/

Features :
 - Login based on passport local strategy (use username and birth year from swapi)
 - Type along search
 - Search limited to 15 in exact last one minute
 - Search results have div width based on population, population is normalized to 100px so as to not overly fill the html
 - State management using flux