# Task manager

Task manager for manage company personal. This is the backend part of the application. The frontend is located [here](https://github.com/Svitlana-Lazurenko/task-manager-frontend).

- The application supports login and registration. Authorization uses JWT (using localstorage).
- Implemented creation, editing and deletion of task categories.
- Implemented creation, editing and deletion of tasks.
- The application uses a database MongoDB.

Backend uses:
- Express
- Mongoose
- Joi
- Morgan

## Endpoints

/users  
- /register POST
- /login POST
- /current GET
- /logout POST

/api/categories
- / GET
- / POST
- /:id DELETE  Parameter: id of category
- /:id PATCH  Parameter: id of category

/api/tasks
- /:id GET  Parameter: id of category
- /:id POST  Parameter: id of category
- /:id DELETE  Parameter: id of task
- /:id PUT  Parameter: id of task
