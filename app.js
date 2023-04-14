const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Task = require('./models/task');


//express app
const app = express();

// connect to mongodb
const databaseName = 'to-do-list'
const databaseUsername = 'zrassam'
const databasePassword = 'test123'
const dbURI = `mongodb+srv://${databaseUsername}:${databasePassword}@cluster0.t3kskym.mongodb.net/${databaseName}?retryWrites=true&w=majority`
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(3000))  //listen for requests on port 3000 but only after we've connected to the database
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));


//register view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.urlencoded({extended: true}))  //crucial for webpage forms POST!
app.use(express.static('public'))
app.use(morgan("dev"));
app.use(express.json())






app.get('/about', (req, res) => {
    Task.find()
        .then(result => {
            res.render('about', {title: "About"})
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/add-task', (req, res) => {
    Task.find()
        .then(result => {
            res.render('add-task', {title: "Add Task"})
        })
        .catch(err => {
            console.log(err);
        });
});


app.put('/complete/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndUpdate(id, {completed: true})
        .then((result)=>{
            res.json({ redirect: '/'});
        })
        .catch(err => {
            console.log(err)
        })
});

app.put('/uncomplete/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndUpdate(id, {completed: false})
        .then((result)=>{
            res.json({ redirect: '/'});
        })
        .catch(err => {
            console.log(err)
        })
});


app.post('/', (req, res) => {
    const task = new Task(req.body);
    task.completed = false;
    task.save()
        .then((result) => {
            console.log(result)
        })
        .then((result) => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect: '/'})
        }).
        catch(err => {
            console.log(err)
        })
});

app.get('/', (req, res) => {
    Task.find()
        .then(result => {
            res.render('index', {title: "Home", tasks: result})
        })
        .catch(err => {
            console.log(err);
        });
});


app.use((req, res) => {
    res.status(404).render('404', {title: "Page not found"})
})



