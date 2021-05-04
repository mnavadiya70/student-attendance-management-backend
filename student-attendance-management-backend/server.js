const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConfig = require('./app/config/db.config')
const routes = express.Router()
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});


const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });

            new Role({
                name: "staff"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'staff' to roles collection");
            });

            new Role({
                name: "student"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'student' to roles collection");
            });
        }
    });

}

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/staff.routes')(app);
require('./app/routes/standard.routes')(app);
require('./app/routes/division.routes')(app);
require('./app/routes/student.routes')(app);
require('./app/routes/attendance.routes')(app);
require('./app/routes/leave.routes')(app);

// function initialUser() {
//     User.estimatedDocumentCount((err, count) => {
//         if (!err && count === 0) {
//             new User({
//                 username: "Mansi",
//                 email: "mansi.navadiya@tatvasoft.com",
//                 password: "Tatva@123",
//                 // roleId: 1
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("Admin added to users collection");
//             });
//         }
//     });

// }
// routes.get('/todos', (req, res) => {
//     Todo.find((error, todos) => {
//         if (error) {
//             console.log("error")
//         }
//         else {
//             res.json(todos)
//         }
//     })
// })

// routes.get('/todos/:id', (req, res) => {
//     let id = req.params.id
//     Todo.findById(id, (error, todos) => {
//         if (error) {
//             console.log("error")
//         }
//         else {
//             res.json(todos)
//         }
//     })
// })

// routes.post('/todos/', (req, res) => {
//     let todo = new Todo(req.body);
//     todo.save()
//         .then(todo => {
//             res.status(200).json({ 'todo': 'todo added successfully' });
//         })
//         .catch(err => {
//             res.status(400).send('adding new todo failed');
//         });
// });

// routes.put('/todos/:id', (req, res) => {
//     let id = req.params.id
//     Todo.findByIdAndUpdate(id, {
//         $set: {
//             todoDescription: req.body.todoDescription,
//             todoResponsible: req.body.todoResponsible,
//             todoPriority: req.body.todoPriority,
//             todoCompleted: req.body.todoCompleted
//         }
//     },
//     {
//         new: true
//     },
//     (error, updatedTodo) => {
//         if (error) {
//             console.log("Error while updating todo");
//         }
//         else {
//             res.json(updatedTodo);
//         }
//     });
// });

// routes.delete('/todos/:id', (req, res) => {
//     let id = req.params.id
//     Todo.findByIdAndRemove(id, (error, todos) => {
//         if (error) {
//             console.log("error")
//         }
//         else {
//             res.json(todos)
//         }
//     })
// })

// const LoginController = require('./app/controllers/login')
// app.use('/api/login', LoginController);