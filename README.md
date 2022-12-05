# ONE HIRING Assessment

## Why does this project exists

This project should show the skills of the repositories owner and is based on the document from One Hiring to test programming skills.

## Tasks

You will create an application to manage article orders. To create an order the user should be able to
choose multiple articles, the needed amounts, the delivery day as well as the recipient.

Every article should have an Id, Name and Description.

The application needs to allow to view, edit or delete all orders. Furthermore, it needs to be possible to
create a file based report of all orders.

- [x] Create a GitHub Repository
- [x] Send the GitHub Repository link to Armin
- [x] Create UI in ASP.NET MVC or Core to display all article orders
- [x] Create UI in ASP.NET to manage article orders (create, update, delete)
- [x] Create a database to store the created orders
- [x] Implement CRUD operations for your database
- [ ] Implements a search functionality to pick an article and a recipient (all available fields should be searchable)
- [x] Implement a CSV report of all created orders that can be called from the UI
- [ ] Implement error handling in backend and useful client-side validation for input fields in the UI
- [x] Implement trace logging (file based)
- [x] Create a technical documentation that covers the used technologies, frameworks, patterns, etc. and why you have chosen them
- [x] Commit your implementation steps as well as the documentation to the GitHub Repository

## Tech Stack

The main project is an ASP.NET Core M(V)C application. It uses NUGET packages to extend the projects functionality to
connect with a TSQL database and log into files. Furthermore it has controller with endpoints for external services and fulfills the REST concept.
All data will be stored in a relational Microsoft database and uses the Entity Framework Core with the code first approach to generate the database scheme via the models. The view aspect is not really used here because the frontend exists as its own identity within the Kestrels publishing service in wwwroot directory.
The UI uses only the Tailwindcss framework for CSS. Javascript ES6 is used to request the backend and to do the logic at UI.

The used technologies are state of the art and comes with most flexibility for the most requirements. The REST concept comes with a possible generated documentation or API and the Entitiy Framework Core lets data between database and backend has been transfered easily. The complete tech stack can be used in a cloud or also be scaled for more performance or distributed load.

For a complex UI should also be used an UI framework and a CI/CD process with tests and a deployment with tags and branches. But this would break the scope of this assessment ;).
