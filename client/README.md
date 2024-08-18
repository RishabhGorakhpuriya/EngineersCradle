Engineers Cradle
Welcome to Engineers Cradle, a simple and modern web application built with React.js, Axios, and Tailwind CSS. This project provides a basic implementation of user registration, login, and product listing functionalities. The front-end of this application uses local storage to manage user credentials and authentication tokens.

Live Preview
You can view the live application here: https://engineerscradle.netlify.app/

Features
User Registration: Create a new account with email and password.
User Login: Log in with your email and password.
Product List: View a list of products after successful login.
Local Storage: Passwords, emails, and tokens are stored using local storage.
Technologies Used
React.js: For building the user interface.
Axios: For handling HTTP requests.
Tailwind CSS: For styling and responsive design.
Local Storage: To store user credentials and authentication tokens on the client side.
Getting Started
Prerequisites
Node.js and npm installed on your machine.
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/RishabhGorakhpuriya/EngineersCradle
Navigate to the Project Directory

bash
Copy code
cd EngineersCradle
Install Dependencies

bash
Copy code
npm install
Set Up Environment Variables

Create a .env file in the root of the project and add your API endpoints:

plaintext
Copy code
REACT_APP_SIGNUP_URL=http://localhost:5000/signup
REACT_APP_LOGIN_URL=http://localhost:5000/login
REACT_APP_PRODUCTLIST_URL=http://localhost:5000/products
Start the Development Server

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Deployment
The application is deployed on Netlify. You can view the live version at: Engineers Cradle

Usage
Registration: Navigate to the signup form, enter your email and password, and submit to create a new account.
Login: After registration, use the login form to authenticate. Upon successful login, you'll be redirected to the product list page.
Product List: View the list of products post-authentication.
Contributing
Feel free to open issues or submit pull requests to improve this project. Contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for details.
