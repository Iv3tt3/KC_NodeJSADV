# NodePop aplication: Multilingual & JWT version

This project is built using my previous project, Nodepop, which is available on GitHub. The documentation below includes changes made in this version as well as the usage instructions for the original version.

NodePop is a web application built using Node.js and MongoDB that allows users to post and browse advertisements. This README provides information on how to set up and use the application, as well as details on initializing the database.

This version introduces multi-language support, JWT authentication, and image uploads processed via background tasks.

## Features
- Home Page: Displays a list of advertisments and offers filter, sorting and pagination functionalities.
- API: Provides endpoints to display, create, update, and delete advertisements.
- Import initial data: Allows importing custom initial data.

## Technologies Used
- Express.js: Web application framework for Node.js. 
- MongoDB: NoSQL database for storing advertisement data.
- Mongoose: MongoDB object modeling tool for Node.js.
- EJS: Templating engine for rendering views.
- Express Validator: Middleware for input validation in Express.js.
- Nodemon: Library that monitors file changes for automatic server restarts.
- Cross-env: Library for setting environment variables cross-platform.
- BasicAuth: Library for basic authentication.

# Installation

## Setup

To set up the NodePop application, follow these steps:

### 1. Clone the Repository
Clone the NodePop repository to your local machine.

```git clone <repository_url>```

### 2. Install Dependencies
Navigate to the project directory 

``` cd NodePop```

and install the required dependencies using npm.

``` npm install ```

### 3. Initialize the Database
Run the initialization script to introduce the database with example advertisements.

>  ⚠️ **Warning:** This action will delete all data in the database.


The `init-db.js` script included in the project initializes the MongoDB database by **DELETING ALL EXISTING DATA** and replace it with example advertisements. 

Before running this script, ensure that MongoDB is installed and running on your system.

To execute the database initialization script, run the following command:

```npm run init-db```

*NOTE: This script prompts you with a security question to confirm the deletion of all database content. Once confirmed, it proceeds to delete existing data and insert example advertisements into the database.*

> #### Import custom data 
> You can import your own initial data. Replace data in ex-adverts.json file. Ensure your data has correct format.


### 4. Start the Server
Start the NodePop server.The server should now be running locally, typically on port 3000.

- Development Mode: Start the application in development mode with automatic restarts using nodemon

  ```npm run dev```

  In development mode, debugging info is enabled and errors will be visible in render templates.

- Production Mode: Start the application in production mode

  ```npm start```

## Usage

Once the server is running, you can access the NodePop application through your web browser or make API requests to interact with it programmatically.

### Website

Open your web browser and navigate to `http://localhost:3000` to access the NodePop website. From there, you can browse existing advertisements and filter. Check ```WEBSITE FILTERS``` section below

### API

NodePop also provides an API for interacting with advertisements programmatically. Here are some sample API endpoints:

- **Get All Advertisements**: Retrieve all advertisements.
- **Create an Advertisement**: Create a new advertisement.
- **Get Advertisement by ID**: Retrieve a specific advertisement by its ID.
- **Update Advertisement by ID**: Update a specific advertisement by its ID.
- **Delete Advertisement by ID**: Delete a specific advertisement by its ID.

For detailed API documentation and usage examples, refer to the API documentation provided below.

# Website filters

You can use the following parameters to filter advertisments in the home page:

- `name`: Filter advertisements by name. Example:

  - `/?name=S` (Return ads starting with S)
  - `/?name=Sofa` (Return ads named sofa)
  
- `sell`: Filter advertisements by selling status. Example: 

  - `/?sell=true`
  
- `tags`: Filter advertisements by tags. Supports filtering by all tags or some tags. Example: 
  - `/?tags=lifestyle` (Return ads containing the tag lifestyle)
  - `/?tags=lifestyle house&type=all` (Return ads containing ALL the tags)
  - `/?tags=lifestyle house&type=in` (Return ads containing some tags)
  
- `price`: Filter advertisements by price range. Example:
  - `/?price=100-500` (Return ads price between 100-500 EUR)
  - `/?price=-500` (Return ads max price 500EUR)
  - `/?price=100` (Return ads min price 100 EUR)

- `skip` and `limit`: Pagination parameters to skip and limit the number of results. Example:
  - `/api/adverts?skip=2&limit=2`

- `sort`: Sort advertisements based on a specific field. Example:
  - `/api/adverts?sort=price`

- `fields`: Select fields to be included in the response. Example:
  - `/api/adverts?fields=tags`

### Example

> GET /api/adverts?name=Sofa&sell=true&tags=lifestyle%20house&type=all&price=100-500&skip=0&limit=10&sort=price


# API Documentatio

This section provides an overview of the extended API endpoints available in the NodePop application, along with examples of how to use them.

> Authentication is required to access the API endpoints of NodePop. You need to provide valid credentials to authenticate your requests. By default use following credenntials: [ username: admin | password: 1234 ]

## 1. Get Advertisements

### Description

Retrieve advertisements based on specified filters such as name, selling status, tags, price, pagination, sorting, and field selection.

### Endpoint

```GET /api/adverts```

### Parameters

- `name`: Filter advertisements by name.
  - Example: `/api/adverts?name=S` (Return ads starting with S)
  - Example: `/api/adverts?name=Sofa` (Return ads named sofa)
  
- `sell`: Filter advertisements by selling status.
  - Example: `/api/adverts?sell=true`
  
- `tags`: Filter advertisements by tags. Supports filtering by all tags or some tags.
  - Example: 
    - `/api/adverts?tags=lifestyle` (Return ads containing the tag lifestyle)
    - `/api/adverts?tags=lifestyle house&type=all` (Return ads containing ALL the tags)
    - `/api/adverts?tags=lifestyle house&type=in` (Return ads containing some tags)
  
- `price`: Filter advertisements by price range.
  - Example: `/api/adverts?price=100-500` (Return ads price between 100-500 EUR)
  - Example: `/api/adverts?price=-500` (Return ads max price 500EUR)
  - Example: `/api/adverts?price=100` (Return ads min price 100 EUR)

- `skip` and `limit`: Pagination parameters to skip and limit the number of results.
  - Example: `/api/adverts?skip=2&limit=2`

- `sort`: Sort advertisements based on a specific field.
  - Example: `/api/adverts?sort=price`

- `fields`: Select fields to be included in the response.
  - Example: `/api/adverts?fields=tags`

### Example

GET /api/adverts?name=Sofa&sell=true&tags=lifestyle%20house&type=all&price=100-500&skip=0&limit=10&sort=price&fields=tags 

## Get Tags

### Description

Retrieve a list of unique tags used in the advertisements.

### Endpoint

GET /api/adverts/tags

### Return

Returns a JSON with following information:

```
{
    "results": [
        {
            "_id": "65e0adb05b8e0647f544841e",
            "name": "Bike",
            "sell": true,
            "price": 200.15,
            "photo": "bike.jpeg",
            "tags": [
                "lifestyle",
                "sports"
            ],
            "__v": 0
        },
        {
            "_id": "65e0adb05b8e0647f544841f",
            "name": "Sofa",
            "sell": false,
            "price": 18,
            "photo": "sofa.png",
            "tags": [
                "lifestyle",
                "house"
            ],
            "__v": 0
        }
    ]
}
```

## 2. Get an Ad by ID

### Description

Retrieve a specific advertisement by its ID.

### Endpoint

GET /api/adverts/:id

### Parameters

- `id`: ID of the advertisement.
Example: GET /api/adverts/6123e7beaf4e12ff9bf4dc7b

### Return

Returns a JSON with following information:

```
{
    "result": {
        "_id": "65e0adb05b8e0647f544841e",
        "name": "Phone",
        "sell": true,
        "price": 50,
        "photo": "phone.png",
        "tags": [
            "tech"
        ],
        "__v": 0
    }
}
```

## 3. Update an Ad

### Description

Update an existing advertisement by its ID.

### Endpoint

PUT /api/adverts/:id

### Parameters

- `id`: ID of the advertisement.
- Request Body: Data to be updated

Example: PUT /api/adverts/6123e7beaf4e12ff9bf4dc7b

(Optional) Check method using Postman
- Open Postman.
- Set the request type to "PUT".
- Enter the URL http://localhost:3000/api/adverts/6123e7beaf4e12ff9bf4dc7b.
- In the request body, provide the updated data.
- Click "Send" to execute the request.

### Return

Returns a JSON with following information:

```
{
    "result": {
        "_id": "65e0adb05b8e0647f544841e",
        "name": "Phone",
        "sell": true,
        "price": 50,
        "photo": "phone.png",
        "tags": [
            "tech"
        ],
        "__v": 0
    }
}
```

## 4. Create an Ad

### Description

Create a new advertisement.

### Endpoint

POST /api/adverts

### Parameters

- Request Body: Data for the new advertisement. Must provide all data (check DATA section to see format allowed)

Example: POST /api/adverts

(Optional) Check method using Postman
- Open Postman.
- Set the request type to "POST".
- Enter the URL http://localhost:3000/api/adverts
- In the request body, provide the data.
- Click "Send" to execute the request.

### Return

Returns a JSON with following information:

```
{
    "result": {
        "name": "Phone",
        "sell": true,
        "price": 100,
        "photo": "phone.png",
        "tags": [
            "tech"
        ],
        "_id": "65e2338317bb6e058116f0db",
        "__v": 0
    }
}
```

## 5. Delete an Ad

### Description

Delete a specific advertisement by its ID.

### Endpoint

DELETE /api/adverts/:id

### Parameters

- `id`: ID of the advertisement.

Example: DELETE /api/adverts/6123e7beaf4e12ff9bf4dc7b

(Optional) Check method using Postman
- Open Postman.
- Set the request type to "DELETE".
- Enter the URL http://localhost:3000/api/adverts/6123e7beaf4e12ff9bf4dc7b.
- Click "Send" to execute the request.

### Return

Returns a JSON with following information:

```
{
    "deleted": {
        "acknowledged": true,
        "deletedCount": 1,
        "deletedAdvert": {
            "_id": "65e2338317bb6e058116f0db",
            "name": "Phone",
            "sell": true,
            "price": 100,
            "photo": "phone.png",
            "tags": [
                "tech"
            ],
            "__v": 0
        }
    }
}
```