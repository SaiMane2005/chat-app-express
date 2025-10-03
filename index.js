const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat=require("./models/chat.js")
const methodOverride=require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))//to attach styling from public folder
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");//whatsapp is an database
}
//Index route
app.get("/chats", async(req, res) => {
  let chats=await Chat.find();//fitching data from the db
  console.log(chats);
  res.render("index.ejs",{chats});
});

app.get("/", (req, res) => {
  res.send("root is working");
});

app.get("/chats/new",(req,res)=>{
  res.render("new.ejs")
})
//Create route=used to add new created chat to the db
app.post("/chats",(req,res)=>{
  let {from, to, msg}=req.body;//the data will parse using the urlencodeted true
  let newchat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  })
  console.log(newchat);
  newchat.save()
  .then(()=>{
       console.log("saved to db");
  }).catch((err)=>{
      console.log("error");
  })
  res.redirect("/chats")
  });
//Edit rouet
app.get("/chats/:id/edit",async(req,res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);//is a asyn function(serching to the db)
  res.render("edit.ejs",{chat});

})
//Update route
app.put("/chats/:id",async(req,res)=>{
  let {id}=req.params;
  let {msg:newMsg}=req.body;
  let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true, new:true})
  res.redirect("/chats");

})
//Destroy route
app.delete("/chats/:id",async(req,res)=>{
  let {id}=req.params;
  let deletedChat= await Chat.findByIdAndDelete(id);
   res.redirect("/chats");

})
app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
