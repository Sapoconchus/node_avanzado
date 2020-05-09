# AnunciaLOL

AnunciaLOL is an API based craigslist-like ad adminsitrator. You are very welcome to use the API by installing the APP into your system

The app runs on ** *localhost/api/* ** however, you can check out a lite preview of the api working on *localhost/view*

If you want to check out the API specs and docu on openAPI 2.0 language, you can install the API following this readMe and then just run the following command.

```sh
$ npm run swagger
```

Or you can simply go to the route *localhost:3000/api/documentation*

## Tech

AnunciaLOL uses a number of open source projects to work properly:

* [node.js](www.nodejs.com) - evented I/O for the backend
* [Express](www.expressjs.com) - fast node.js network app framework [@tjholowaychuk]
* [MongoDB](www.mongodb.com) - DB powered mongo Style

## Installation

AnunciaLOL requires [Node.js](https://nodejs.org/) v4+ to run and a MongoDB database deployed on local computer.

The DB is based on mongoDB so if you don't have it installed on your computer, you ought to go to their website [MongoDB](www.mongodb.com) and follow their installation guide and use instructions.

The global variables such as mail provider config or mongoDB url are stored on the .env file. You must rename ".env.example" to ".env" and use your own config.

To correctly use anunciaLOL, first, download this repo. Then, install the dependencies and devDependencies, launnch your [DB](https://mongodb.com) and start the server.

**install dependencies**
```sh
$ npm install
```
**initialize DB**
Then initialize your DB on the application by running this script. It will start the DB, create its schemas and two basic examples of ads and users. You can access the API with the dummy user "user@example.com" and password:"1234". This command will also remove all pictures from public storage if you run it after trying the API.
```sh
$ npm reset_db
```
**Microservices**
In order to free process availability for the API, some processes are delivered through lite microservices. Currently, all user mailing and pic resizing for thumbnails run on two different services.

You can run them separately using the commands
```sh
$ npm run mailer  || mailing services
$ npm run resizer || thumbnail creator 

```

or run them with [PM2](www.pm2.keymetrics.io) running
```sh
$ npm run pm2_start  || start listening to both services
$ npm run pm2_stop  || stop listening services
$ npm run pm2_delete  || delete services from pm2 list

```

**Launch the API**
Before launching the API, please make sure you are running mongoDB and microservices so it can work properly. Then launch the express API to start listening to events on *LOCALHOST:3000* 
```sh
$ npm run dev || development model
$ npm start   || Production mode

```

**Picture cleaner**
If you ever want to clean the image directory of the ads, but not reset the database, just run
```sh
$ npm run pic_rm
```

## AD Structure and schema
The ADS will have the following keys and value types:
| key | value (type) |
| ------ | ------ |
| title | String |
| Description | Mixed (indexed)|
| price | Number |
| Tags | Array |
| Cover | String (Path to fs) |
| Thumbnail |  String (Path to fs) - 100x100 version of cover pic (automatically uploaded by microservice) |
| Pictures | array (of paths |
| Type | Boolean (true =sell -- false = buy)|
| City | String |

## User Structure and schema
The Users will have the following keys and value types:
| key | value (type) |
| ------ | ------ |
| username | String |
| email | String|
| password | String |

## API methods and endpoints

- The API is divided on two main features: user administration and Ad displaying & management.
- The API does not require login in order to GET the ads, but login is required for posting, updating and deleting. User access is managed an API-KEY provided on login.
- A user can only update or delete their own ads

### USER ADMIN
User administration is divided on two methods: register an user and login into the platform

#### REGISTER
```sh
Endpoint: https://localhost:3000/api/user/register
Request method: POST

Headers:
{
    content-type: application-URLencoded
}
Body:
{
    username: String,
    email: string
    password: String,
}

response type: Json
{
    "success": true,
    "newUser": {
        "_id",
        "username",
        "email",
        "password",
        "__v",
    }
}

```
#### Login
```sh
Endpoint: https://localhost:3000/api/user/login
Request method: POST

Headers:
{
    content-type: application-URLencoded,
}

Body:

{
    username: String,
    password: String,
}

response type: Json
{
    "success": true,
    "token": API-KEY
}

```

### AD Management
The APP covers the CRUD basics plus methods to manage pictures.

#### Display Ads
```sh
Endpoint: https://localhost:3000/api/ads/
Request method: GET
response type: Json

response: {
    ads: [{
        title: title,
        description: description,
        etc
    }]
}
```
You can filter, limit & skip (for pagination), order and select displayed fields by passing the following query params:

| filter | query | example |
| ------ | ------ | ----------- |
| title | exact match | title=coche
| Description | indexed (will search coincidences on every field)| description = log lake big
| price | Number (from - to) | price=100-600 // price=-600 // price=100-
| Tags | Array | tags= lifestyle motor realstate
| Type | Boolean (true =sell -- false = buy)|type=true
| City | String | city=Madrid

Example: 
https://localhost3000:api/ads?title=car&price=-20000&city=Madrid
Will display ads with the title including "car" with a max. price of 20000 and with city Madrid.
**Queries are case sensitive**

#### Display single Ad
```sh
Endpoint: https://localhost:3000/api/ads/:id
Request method: GET
response type: Json

response: {
    sucess: true,
    ad: {
        title: title,
        description: description,
        etc
    }
}
```

#### Post AD (login required)

It requires at least Title, price and type. Any other field is optional.

```sh
Endpoint: https://localhost:3000/api/ads/create
Request method: POST

Headers: 
{
    content-type: 'application/form-data',
    token: API-KEY
}
body:
{
    title: string,
    description: String,
    price: Number,
    Tags: Array, **words without spacing, otherwise the Api will consider every word a different tag when qerying**
    Cover: file,
    pictures: file (max. 8 files) stored in array
    Type: Boolean,
    city: String
}


response type: Json
{
    "success": true,
    "ad": {
        "pictures": [],
        "tags": [],
        "_id",
        "title",
        "price",
        "type",
        "cover",
        "user",
        "__v"
    }
}
```
#### Edit AD (login required)

Use it to edit an ad info. For picture management there are especific methods.
```sh
Endpoint: https://localhost:3000/api/ads/:id
Request method: PUT

Headers 
{
    content-type: 'application/x-www-form-urlencoded',
    token: API-KEY
}
Body
{
    key: value
}

response type: Json
{
    "sucess": _id,
    "changes": {
        title: title,
        description: description,
        ...
    }
}
```
#### Delete AD (login required)
```sh
Endpoint: https://localhost:3000/api/ads/:id
Request method: DELETE

Headers {
    content-type: 'application/x-www-form-urlencoded',
    token: API-KEY
}

response type: Json
{
    "sucess": true,
    "deleted": _id
}
```
#### Update cover picture (login required)
```sh
Endpoint: https://localhost:3000/api/ads/cover/:id
Request method: POST

Headers 
{
    content-type: 'application/form-data',
    token: API-KEY
}
Body:
{
    "pictures": [files]
}

response type: Json
{
    "success": true,
    "ad": _id,
    "path": {
        "cover": "ad_pics/file.extension"
    }
}
```

#### Add pictures to an AD -max. 8 pics per Ad- (login required)
This method overwrites all previous pictures with the following pictures. Should you want to include previous pictures, add them to the request
```sh
Endpoint: https://localhost:3000/api/ads/pics/:id
Request method: POST

Headers 
{
    content-type: 'application/form-data',
    token: API-KEY
}
Body:
{
    "pictures": [files]
}

response type: Json
{
    "success": true,
    "ad": _id,
    "pictures": [paths]
}
```
#### Get available tags
```sh
Endpoint: https://localhost:3000/api/ads/tags
Request method: GET
response type: Json

response: {
    sucess: true,
    tags: [tags]
}
```
# Enjoy! 