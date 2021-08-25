# Product API with Nodejs and Postgres Database

This project uses <code>Nodejs</code> as backend, <code>Postgres</code> as database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

Below are the few softwares that needs to be installed

>Nodejs <br/>
>Postgres <br/>

### Installing

A step by step series of examples that tell you how to get a development env running

>1. Clone the project using `git clone https://gitlab.com/janak29/galvanize-product-demo.git` <br/>
>2. Move to the working directory <code>cd galvanize-product-demo</code> <br/>
>3. Install the node modules by using <code>npm install</code> <br/>
>4. Copy the sample.env file to .env <code>cp sample.env .env</code> <br/>
>5. Update the .env file, if needed otherwise you are ready to launch the application. <br/>

### A typical top-level directory layout
    .
    ├── node_modules                            # Libraries that are used in the application
    ├── migrations                              # Database Schems
    ├── src                                     # Source files
    ├    ├── config                             # Application Specific config
    ├    ├── controllers                        # Controller
    ├    ├── models                             # Model
    ├    ├── routes                             # Routes used within the application
    ├    ├── utilities                          # Utilities to run shell commands
    ├    ├── validators                         # Validate application logic 
    ├    ├── server.js                          # Entry point to the application
    ├── package.json                            # List of packages needed to start the application
    └── README.md                               # Breif summary of the application
    └── Product Demo.postman_collection.json    # Breif summary of the application

### Running

Use the below command to run the application in hot reload mode

>npm run dev-serve <br/>

### Styling

Use the below command to format and lint the code.

>npm run lint <br/>

#### Built With

* [ESlint](https://github.com/eslint/eslint)
* [Prettier](https://github.com/prettier/prettier)
* [Airbnb Guide](https://github.com/airbnb/javascript)

### Testing

Use the below command to test the application

>npm test <br/>

### Go Live

Use the PM2 to run the application in Production mode, for that install [PM2](https://www.npmjs.com/package/pm2)

>npm run prod-serve <br/>