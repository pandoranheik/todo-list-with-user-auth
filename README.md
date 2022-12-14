# 📝 todo-list-with-user-auth
Todo list application with [JWT](https://jwt.io/) user authorization. The application calls an api route from the client to the server and performs simple CRUD operations.

## 🥞 Tech stack
| Frontend | Backend       | Database |
| :---:   | :---:        | :---:         |
| [React](https://reactjs.org/) | [Express](https://expressjs.com/)   | [PostgreSQL](https://www.postgresql.org) |

## 👨‍💻 How the API works 
##### All `/api/todos` routes are protected with JWT. 
| Methods | Routes       | Functionality |
| :---:   | :---:        | :---:         |
| `POST` | /api/register   | Add user to database |
| `GET`   | /api/login   | Verify if the user already exist in the database |
| `POST ` | /api/login   | Verify the user to login & create a JWT for them  |
| `GET`   | /api/todos   | Get all todos from the database |
| `POST ` | /api/todos   | Add a todo to the database    |
| `EDIT`  | /api/todos   | Edit selected todo   |
| `DELETE`| /api/todos   | Delete selected todo  |

## 🖼️ Images
![todo-list-login](https://user-images.githubusercontent.com/72290056/187053772-52668352-6be7-434a-986c-1e65de0e8bd3.png)
![todo-list-page](https://user-images.githubusercontent.com/72290056/187053734-9cfefd9d-3db6-4064-9362-3dfbcc90185b.png)

