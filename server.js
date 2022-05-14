const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

//body parser
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});
//get a message
app.get("/message/:messageId", (req, res) => {
  const { messageId } = req.params;
  const found = messages.find((message) => message.id === Number(messageId));
  if (found) {
    return res.json(found);
  } else {
    return res.status(404).json("nothing found!");
  }
});

// app.get("/messages", (req, res)=> {
//   const { id } = req.query;
//   if (id !== undefined) {
//     const messageToReturn = messages.find(
//       (message) => message.id === Number(id)
//     );
//     return res.json(messageToReturn);
//   }
//   res.json(messages);
// });

//
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  const ourMessageObject = {
    id: messages.length,
    from,
    text,
  };
  messages.push(ourMessageObject);
  res.send(messages);
});

//delete messages
app.delete("/messages/:id", (req, res) => {
  // const {messageId} = req.params;
  // const foundMessageIndex = messages.findIndex((message)=> message.id===Number(messageId));

  // if(foundMessageIndex > -1){
  //   res.json(messages[foundMessageIndex])
  //   messages.splice(foundMessageIndex, 1);
  // } else {
  //   res.status(404).send(`nothing found with the id of ${messageId}`)
  // }
  const id = Number(req.params.id);
  const foundMessage = messages.find((item) => item.id === id);
  if (!foundMessage) {
    return res.send(`message not found`);
  }
  messages = messages.filter((item) => item.id != id);

  return res.json(messages);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App is  running");
});
