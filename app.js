const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const port = process.env.PORT || 3000
//express app
const app = express();

//connect to mongodb & listen to requests
const dbURI = 'mongodb+srv://binit:test12345@cluster0.thipl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true,useUnifiedTopology: true}) //{useNewUrlParser: true,useUnifiedTopology: true}--> removes deprication in database server
.then((result) => /*console.log('Connected to db')*/app.listen(port))
.catch((err) => console.log(err));

//register view engine
app.set('view engine','ejs');

//listen for requests
// app.listen(3000);


/* SELF MADE MIDDLEWARE */
// app.use((req,res,next) => {
//     console.log('new request made');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next();
// });
// app.use((req,res,next) => {
//     console.log('in the next middleware');
//     next();
// });
/* SELF MADE MIDDLEWARE */



//mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res) => {
//     const blog = new Blog ({
//         title: 'new blog2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });
//     blog.save()
//     .then ((result) => {
//         res.send(result)
//     })
//     .catch ((error) => {
//         console.log(err); 
//     });
// })

// //Find all blogs

// app.get('/all-blogs',(req,res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })

// app.get('/single-blog', (req,res) =>{
//     Blog.findById('6112aefb11ed23441050a78e')
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })
//SandBox routes


// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });


app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>');
    // const blogs = [
    //     {title: 'Binit finds eggs', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'},
    //     {title: 'Mario finds stars', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'},
    //     {title: 'How to defeat Competitors', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'},
    // ]
    // res.render('index',{title:' Home',blogs});
   res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>');
    res.render('about',{title:' About'});
});  

//blog routes
app.use('/blogs', blogRoutes);
//app.use('/blogs', blogRoutes); adding blogs routes from here so that u dont have to write
// /blogs in router.get('blogs/') inside blogRoutes.js file

app.use((req, res) => {
    res.status(404).render('404',{title:" 404 Error"});
})