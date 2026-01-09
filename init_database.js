// Script to run database initialization
// This script provides a command-line interface to initialize the database

const { exec } = require('child_process');
const path = require('path');

console.log('Starting database initialization...');

// Path to the initialization script
const initScriptPath = path.join(__dirname, 'src', 'database', 'init_db.js');

// Execute the initialization script
const child = exec(`node ${initScriptPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    
    console.log(`Output: ${stdout}`);
});

child.on('close', (code) => {
    console.log(`Database initialization process exited with code ${code}`);
    process.exit(code);
});