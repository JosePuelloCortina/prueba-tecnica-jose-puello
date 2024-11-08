const app = require("./app.js"); 
const { conn } = require('./db.js');
conn.sync({ force: true}).then(async() => {
    try {
        console.log("Database connected")
        await app.listen(3000, () => {
            console.log("server corriendo en el puerto 3000")
        })
    } catch (error) {
        console.log("error", error)        
    }
})