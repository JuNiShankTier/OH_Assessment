# ONE HIRING Assessment

## Why does this project exists
This project should show the skills of the repositories owner and is based on the document from One Hiring to test programming skills.

## Tasks
You will create an application to manage article orders. To create an order the user should be able to 
choose multiple articles, the needed amounts, the delivery day as well as the recipient. 

Every article should have an Id, Name and Description.

The application needs to allow to view, edit or delete all orders. Furthermore, it needs to be possible to 
create a file based report of all orders.

- [X] Create a GitHub Repository
- [X] Send the GitHub Repository link to Armin
- [X] Create UI in ASP.NET MVC or Core to display all article orders
- [X] Create UI in ASP.NET to manage article orders (create, update, delete)
- [X] Create a database to store the created orders
- [X] Implement CRUD operations for your database
- [ ] Implements a search functionality to pick an article and a recipient (all available fields should be searchable)
- [X] Implement a CSV report of all created orders that can be called from the UI
- [ ] Implement error handling in backend and useful client-side validation for input fields in the UI
- [X] Implement trace logging (file based)
- [ ] Create a technical documentation that covers the used technologies, frameworks, patterns, etc. and why you have chosen them
- [X] Commit your implementation steps as well as the documentation to the GitHub Repository

## Tech Stack
The main project is an ASP.NET Core M(V)C application. It uses NUGET packages to extend the projects functionality to
connect with a TSQL database and log into files. Furthermore it has controller with endpoints for external services and fulfills the REST concept.
All data will be stored in the relational Microsoft database and uses the Entity Framework Core with the code first approach to generate via the models the database.

