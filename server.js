const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({name: "APi Teste 3ds", version: "1.0" });
})

app.post("/authentication", async (req, res) => {
    
    const url = process.env.BASEURL; 
    const clientId = process.env.ClientID;
    const clientSecret = process.env.ClientSecret;

    const encodedToken = Buffer.from(`${clientId}:${clientSecret}`,'utf-8').toString('base64');

    const cieloData = req.body;
    
    console.log({
        cieloData, encodedToken, url
    });

   try {
    const response = await axios.post(url, cieloData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedToken}`,
        }
    });
    return res.json(response.data);
   } catch (error) {
       console.log(error);
    return res.json({ message: "ocorreu um erro" });
   }
    
});


app.listen(process.env.PORT || 5000, () => {
    console.log("Api Running");
});