const express = require("express");
const sql = require("mssql");
const path = require("path");  // Add this line to import the path module
const app = express();
const PORT = process.env.PORT || 8080;

// Configuration should use environment variables for sensitive data
var config = {
    user: process.env.DB_USER || "jcesula", // Database username   
    password: process.env.DB_PASSWORD || "joel2001", // Database password
    server: process.env.DB_SERVER || "localhost", // Server IP address
    options: {
        encrypt: false, // Disable encryption
        port: process.env.DB_PORT || 1433, // Database port
        database: process.env.DB_NAME || 'form_data',
        instancename: process.env.DB_INSTANCE || 'SQLEXPRESS' // Instance name
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));`

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/", async (req, res) => {
    const firstName = req.body.First_Name;
    const lastName = req.body.Last_Name;
    const emailaddress = req.body.Email;
    
    console.log(firstName, lastName, emailaddress);
    
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server');
        
        const request = new sql.Request();
        request.input('firstName', sql.VarChar, firstName);
        request.input('lastName', sql.VarChar, lastName);
        request.input('emailAddress', sql.VarChar, emailaddress);
        
        await request.query(`INSERT INTO users (first_name, last_name, email_address) VALUES (@firstName, @lastName, @emailAddress)`);
        
        res.redirect("/success.html");
    } catch (err) {
        console.error('Failed to connect to SQL Server:', err);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
