const express = require('express');
const cors = require('cors')

require('./db/mongoose');

const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const genreRouter = require('./routers/genre')
const platformRouter = require('./routers/platform')

const app =  express();
app.use(express.json());

let corsOptions = {
   origin : ['http://localhost:5173'],//allows this URI to connect to the services without CORS error
}
app.use(cors(corsOptions));

app.use(userRouter);
app.use(itemRouter);
app.use(genreRouter);
app.use(platformRouter);

const port = process.env.PORT;

app.listen(port, () => {
   // Bash Color Flag: \x1B[35m => makes the command color 'magenta'
   console.log(`\x1B[35mServer listening on port: ${port}`);
})
