const express = require("express");
const sql = require("mssql");
const path = require("path");  // Add this line to import the path module
const app = express();
const PORT = process.env.PORT || 8080;

var config = {
    "user": "joeladmin", // Database username   
    "password": process.env.DB_Password, // Database password
    "server": process.env.DB_SERVER, // Server IP address
    "database": process.env.DB_DATABASE,
    "options": {
        "encrypt": true,
        trustServerCertificate: false // true for local dev/testing
    }
}


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")

})

app.post("/",(req,res)=>{
    const firstName = req.body.First_Name
    const lastName = req.body.Last_Name
    const emailaddress = req.body.Email
    console.log(firstName)
    console.log(lastName)
    console.log(emailaddress)
    sql.connect(config)
    .then(() => {
        console.log('Connected to SQL Server');
        let request = new sql.Request()
        request.input('firstName', sql.VarChar, firstName);
        request.input('lastName', sql.VarChar, lastName);
        request.input('emailAddress', sql.VarChar, emailaddress);
        request.query(`INSERT INTO [dbo].[users] (first_name, last_name, email_address) VALUES (@firstName, @lastName, @emailAddress)`,
        );
    })
    .catch((err) => {
        console.error('Failed to connect to SQL Server:', err);
});
    res.redirect("/success.html")
})

app.listen(PORT, (req,res)=>{
    console.log(`Listening to port ${PORT}`)
    console.log("The console log is currently open to assess the code.")
})
