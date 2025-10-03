//this js file is created to add the sample data in the mongodb
const mongoose = require("mongoose");
const Chat=require("./models/chat.js")

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");//whatsapp is an database
}
let allChats=[
  {
  from:"neha",
  to:"priya",
  msg:"send me your exam sheet",
  created_at: new Date()
  },
  {
  from:"sai",
  to:"pranjali",
  msg:"my girl",
  created_at: new Date()
  },
  {
  from:"pratik",
  to:"sai",
  msg:"you are my best friend",
  created_at: new Date()
  },
  {
  from:"sanskruti",
  to:"pranjali",
  msg:"styler",
  created_at: new Date()
  },
]


Chat.insertMany(allChats);
// .save().then((res)=>{
//   console.log(res);
// })