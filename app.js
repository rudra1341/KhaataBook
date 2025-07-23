const express=require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const path=require('path');
const session = require('express-session');
const mongooseconnection=require("./config/mongoose");
const {user,validateModel,validateLogin}=require('./models/user');
const hisaab = require('./models/hisab');
const { name } = require('ejs');
const sampleHisaabs=require('./dummydata')
const sampleUsers=require('./dummyusers')


const port=process.env.PORT || 3000;
const app=express();
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views')); // <-- this is good practice

app.use(session({
  secret: process.env.session_secret, 
  resave: false,
  saveUninitialized: false,
}));

//route protection
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}
//REGISTER
app.get('/register', (req, res) => {
  res.render('register'); // loads views/register.ejs
});

app.post('/register', async (req, res) => {
  
  const { error, value } = validateModel(req.body);

  
  if (error) {
    return res.status(400).send(error.message);
  }

  
  const { name: validName, email: validEmail, password: validPassword } = value;

  try {
    
    const existingUser = await user.findOne({ email: validEmail });
    if (existingUser) {
      return res.send("Email already registered");
    }

    
    const hashedPassword = await bcrypt.hash(validPassword, 10);

    await user.create({
      name: validName,
      email: validEmail,
      password: hashedPassword
    });

    res.redirect('/login');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send("Server error");
  }
});
//LOGIN
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async(req,res,next)=>{
    const{error,value}=validateLogin(req.body);
    if(error){
        return res.status(400).send(error.message);
    }

    const{email,password}=value;
    try{
        const existingUser=await user.findOne({email});
        if (!existingUser) {
      return res.send("Invalid email or password");
    }
     const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.send("Invalid email or password");
    }
     req.session.userId = existingUser._id;
    req.session.userName = existingUser.name;
res.redirect('/homepage')
}catch(err){
    console.error('Error logging in user:', err);
    res.send('Server error');
}});


//CREATING NEW HISAAB
app.get("/create",isAuthenticated,(req,res)=>{
    res.render("create");
})

app.post("/create",isAuthenticated, async (req, res, next) => {
  const { title, description, encrypt, shareable, passcode, editable } = req.body;

  if (!title || !description) {
    return res.send("All fields are required!");
  }

  try {
    const newHisaab = await hisaab.create({
      title,
      description,
      encrypt: !!encrypt,
      shareable: !!shareable,
      passcode,
      editable: !!editable,
      userId:req.session.userId
    });

   

    res.redirect('/homepage');
  } catch (err) {
    console.error('Error saving hisaab:', err);
    res.send("Error creating Hisaab.");
  }
});





//HOMEPAGE
app.get("/homepage",isAuthenticated,async(req,res)=>{
    const sortOrder=req.query.sortOrder ||"newest";
    const selectedDate=req.query.selectedDate;
    let query={userId: req.session.userId}
    
    
    if (selectedDate) {
    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    query.createdAt = { $gte: start, $lt: end };
  }
  const hisaabs=await hisaab.find(query).sort({
        createdAt:sortOrder==="newest"?-1:1
    })
    
    res.render("homepage",{hisaabs,
        filterLabel: "Filters 🔧",
    sortOrder,
    selectedDate
    });
    
})

app.get("/hisaab/:id",isAuthenticated, async (req, res) => {
  const hisaabData = await hisaab.findById(req.params.id);

  if (!hisaabData || hisaabData.userId.toString() !== req.session.userId) {
    return res.status(403).send("Unauthorized");
  }
  if (!hisaabData.encrypt) {
    return res.render("viewhisaab", { hisaab: hisaabData });
  }

  
  res.render("enterpasscode", { hisaabId: hisaabData._id, error: null });
});

//passcode submission
app.post("/hisaab/:id/unlock",isAuthenticated, async (req, res) => {
  const { passcode } = req.body;
  const hisaabData = await hisaab.findById(req.params.id);
  if (!hisaabData || hisaabData.userId.toString() !== req.session.userId) {
  return res.status(403).send("Unauthorized");
}

  if (hisaabData.passcode === passcode) {
    return res.render("viewhisaab", { hisaab: hisaabData });
  } else {
    return res.render("enterpasscode", {
      hisaabId: hisaabData._id,
      error: "Incorrect passcode"
    });
  }
});

app.post("/delete/:id",isAuthenticated,async(req,res)=>{
     try {
    await hisaab.findByIdAndDelete(req.params.id);
    res.redirect('/homepage');
  } catch (err) {
    console.error('Delete error:', err);
    res.send('Failed to delete');
  }
});

app.get('/edithisaab/:id',isAuthenticated, async (req, res) => {
  try {
    const hisaabdata = await hisaab.findById(req.params.id);
    if (!hisaabdata || hisaabdata.userId.toString() !== req.session.userId) {
  return res.status(403).send("Unauthorized");
}
    res.render('edithisaab', { hisaab:hisaabdata }); 
  } catch (err) {
    console.error('Error loading edit form:', err);
    res.send('Failed to load edit form');
  }
});
app.post("/edithisaab/:id",isAuthenticated, async (req, res) => {
  const { title, description, encrypt, shareable, passcode, editable } = req.body;

  try {
    await hisaab.findByIdAndUpdate(req.params.id, {
      title,
      description,
      encrypt: !!encrypt,
      shareable: !!shareable,
      passcode,
      editable: !!editable,
    });

    res.redirect("/homepage");
  } catch (err) {
    console.error("Edit failed:", err);
    res.send("Failed to update Hisaab.");
  }
});
//shared
app.get("/share/:id",isAuthenticated, async (req, res) => {
  try {
    const hisaabData = await hisaab.findById(req.params.id);
    if (!hisaabData || hisaabData.userId.toString() !== req.session.userId) {
  return res.status(403).send("Unauthorized");
}

    if (!hisaabData) {
      return res.status(404).send("Hisaab not found");
    }

    if (!hisaabData.shareable) {
      return res.send("This Hisaab is not shareable.");
    }

    if (hisaabData.encrypt) {
      return res.render("enterpasscode", { hisaabId: hisaabData._id, error: null });
    }

    res.render("viewhisaab", { hisaab: hisaabData });
  } catch (err) {
    console.error(err);
    res.send("Error loading shared Hisaab");
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
});


app.listen(port);