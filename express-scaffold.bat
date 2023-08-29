@echo off

echo Express.js generator scaffolding is running...

set /p project_name=Enter project name: 
set /p project_description=Enter project description: 
set /p author=Enter author name: 

@REM Step 1: Alternatives to 'npm init' and fill it with customized info
echo Initializing npm project...
(
    echo {
    echo    "name": "%project_name%",
    echo    "version": "1.0.0",
    echo    "description": "%project_description%",
    echo    "main": "app.js",
    echo    "scripts": {
    echo        "start": "node src/app.js",
    echo        "dev": "env-cmd -f src/config/.env nodemon src/app.js",
    echo        "test": "echo \"Error: no test specified\" && exit 0"
    echo    },
    echo    "keywords": [],
    echo    "author": "%author%",
    echo    "dependencies": {}
    echo }
)>"package.json"

@REM Step 2: Make directories and files
echo Creating directories and files...

mkdir src
echo # %project_name% > src\README.md
mkdir src\routers
echo # Routers > src\routers\README.md
mkdir src\models
echo # Models > src\models\README.md
mkdir src\middleware
echo # Middleware > src\middleware\README.md
mkdir src\db
echo # Database > src\db\README.md
(
    echo const mongoose = require^('mongoose'^);
    echo mongoose.connect^(process.env.MONGODB_URL, ^{
    echo    useNewUrlParser: true
    echo ^}^);
) > src\db\mongoose.js
mkdir src\config
echo # Config > src\config\README.md
(
    echo PORT=3000
    echo MONGODB_URL=mongodb://127.0.0.1:27017
) > src\config\.env

@REM Step 3: Create app.js file with prepared codes
(
    echo const express = require^('express'^);
    echo require^('./db/mongoose'^);
    echo\
    echo const app =  express^(^);
    echo app.use^(express.json^(^)^);
    echo\
    echo const port = process.env.PORT;
    echo\
    echo app.listen^(port, ^(^) =^> ^{
    echo    // Bash Color Flag: \x1B^[35m =^> makes the command color 'magenta'
    echo    console.log^(`\x1B^[35mServer listening on port: $^{port^}`^);
    echo ^}^)

)> src\app.js

@REM Step 4: Install packages
echo Installing packages...
npm install express mongoose jsonwebtoken validator bcryptjs && npm install --save-dev env-cmd nodemon


@REM Step 5: Display suggestions
echo Suggestions:
echo - Customize the routes in the 'routes' directory.
echo - Define your models and business logic in the 'models' directory.
echo - Build and expand your application as needed.

echo All steps completed!

pause