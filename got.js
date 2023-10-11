import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
const app = express()
const portnumber = 3000

//middleware
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/', async (req,res) => {
    try{
        const response = await axios.get("https://thronesapi.com/api/v2/Characters");
        const result = response.data;
        res.render("got.ejs", {data:result[0]})
    }
    catch(error){
        console.error("Failed GET", error.message);
        res.status(500).send(error.message)
    }
})

app.get('/:id', async (req,res) => {
    try{
        const id = req.query.type;
        const response = await axios.get(`https://thronesapi.com/api/v2/Characters/${id}`);
        const result = response.data;
        res.render("got.ejs", {data:result})

    }
    catch(error){
        console.error("Failed", error.message);
        res.status(500).send(error.message)
    }
})


app.listen(portnumber,()=>{
    console.log(`server is running at ${portnumber}`);
})