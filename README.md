# Learner-s-Dictionary

Learner's Dictionary is a simple web application that allows users to get meanings for a specific word. 
**Getting Started**

To run the App locally, follow these steps:

**Prerequisites**

You need to have the following installed on your machine:

1. Node.js
2. npm (Node Package Manager)

**Installation**

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/BismahMalik/Learner's Dictionary.git
   cd Learner's Dictionary
   
Install the required dependencies:

**npm install**

**Running the App**

To start the server and run the app, use the following command:
 
**npm start**

The server will start running on **http://localhost:3000.**

**Usage**

1. Open your web browser and go to **http://localhost:3000.**
2. Enter the word.
3. Click the "Search" button.
4. The app will fetch data for the specified word and display it on the page.

**Architecture**

The App is built using a server-client architecture.

**Server-side**

The server is implemented using Node.js and Express. It serves static HTML, CSS, and JavaScript files to the client and handles API requests to fetch data from Rapid API by API Ninjas.

The server-side code is located in the server.js file. It uses the axios library to make HTTP requests to the external API.


**Client-side**

The client-side is implemented using HTML, CSS, and JavaScript. 

The client-side code is located in the public/index.html and public/index.js files.

**Deployment**

You can deploy the Weather App to a hosting platform of your choice. Some popular options include:

**1. Heroku**.
**2. Netlify**.
**3. Vercel**.
**4. AWS Elastic Beanstalk**.
**5. DigitalOcean**.

Before deploying, make sure to set the environment variables (API_KEY and API_HOST) on the hosting platform to secure your API key.

**Contributing**

If you find any issues or want to contribute to the  App, feel free to create a pull request or submit an issue in the GitHub repository.

**License**

The App is open-source and distributed under the MIT License. You can use, modify, and distribute the code as per the terms of the license.
