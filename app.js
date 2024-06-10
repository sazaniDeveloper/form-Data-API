const express = require("express")
const sql = require("mssql")
const app = express()
const PORT = process.env.PORT 5510

var config = {
    "user": "jcesula", // Database username   
    "password": "joel2001", // Database password
    "server": "localhost", // Server IP address
    "Port":"1433", // Database name
    "options": {
        "encrypt": false,
        port: 56544,
        database: 'form_data',
        instancename: 'SQLEXPRESS' // Disable encryption
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
        request.query(`INSERT INTO users (first_name, last_name, email_address) VALUES (@firstName, @lastName, @emailAddress)`,
        );
    })
    .catch((err) => {
        console.error('Failed to connect to SQL Server:', err);
});
    res.redirect("/success.html")
})

app.listen(PORT, (req,res)=>{
    console.log(`Listening to port ${PORT}`)
})
