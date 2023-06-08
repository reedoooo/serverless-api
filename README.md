# serverless-api

## Overview

In this lab, you'll be creating a serverless REST API using Amazon Web Services (AWS) Cloud Services. This includes creating and interacting with a DynamoDB database, routing with API Gateway, and CRUD operation handlers using Lambda Functions.

## Feature Tasks & Requirements

You are to create a single resource REST API using a domain model of your choosing. The following AWS services are required:

- Database: DynamoDB (1 Table)
- Routing: API Gateway
- CRUD Operation Handlers: Lambda Functions

### Routing:

#### POST

- /people - Given a JSON body, inserts a record into the database.
- Returns an object representing one record, by its id (##).

#### GET

- /people - Returns an array of objects representing the records in the database.
- /people/## - Returns an object representing one record, by its id (##).

#### PUT

- /people/## - Given a JSON body and an ID (##), updates a record in the database.
- Returns an object representing one record, by its id (##).

#### DELETE

- /people/## - Given an id (##), removes the matching record from the database.
- Returns an empty object.

## Implementation Notes

Work in a non-main branch in a new repository called ‘serverless-api’. While your code will all reside in a single repo, your functions will need to be individually .zipped and deployed using common libraries (node_modules) and schema files.

- Create one table for one data model at Dynamo DB.
- Create a Dynamoose schema to define the structure of your table.
- Write lambda functions that will separately perform the proper CRUD operation on the database.
- Create your routes using API Gateway.
- Routes should integrate with the appropriate Lambda function to perform the operation.

## Proposed File Structure

If using a non-AWS dependency like dynamoose, be sure to include node_modules and package-lock.json in your zipped directory.
├── handleCreate
│ ├── index.js
│ ├── create.test.js
│ └── package.json
├── handleDelete
│ ├── index.js
│ ├── delete.test.js
│ └── package.json
├── handleRead
│ ├── index.js
│ ├── read.test.js
│ └── package.json
├── handleUpdate
│ ├── index.js
│ ├── update.test.js
│ └── package.json
├── .eslintrc.json
├── .gitignore
└── README.md

## Testing

Write test cases for each Lambda function, once you can assert the type of data coming back from Dynamoose and the type of input you’ll get from the API in the event.

## Deployment

Deploy your functions manually at the beginning, uploading .zip files containing the required files to each function. As a stretch goal, you should aim to have your functions automatically deployed on all checkins to your main branch.

## Stretch Goal

Your API routes and Lambda functions are currently tightly coupled. Can you create a system where the API routes send in the data model as a parameter, and the lambda functions dynamically use the correct schema to handle the request?

Example:

GET /{model}/{id} should invoke a lambda function that knows how to switch the Dynamo table name to match the model parameter and to use the correct schema for that model name.

This could create a very dynamic system, that could handle any data model…

## Documentation

[UML](./serverless-api.jpeg)

- Document the data and program flow for your API, including the mapping of Routes and Functions, as well as the flow of data.
- What is the root URL to your API?
- What are the routes?
- What inputs do they require?
- What output do they return?

## Submission Instructions

Submit a well-written README.md in your repository, following the guidelines above.

© Code Fellows 2023
