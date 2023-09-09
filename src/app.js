const express = require('express');
require('./db/mongoose');

const app =  express();
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
   // Bash Color Flag: \x1B[35m => makes the command color 'magenta'
   console.log(`\x1B[35mServer listening on port: ${port}`);
})
