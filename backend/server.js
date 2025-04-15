const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
// require('dotenv').config({ path: './backend/.env' });

const allowedDomains = [process.env.URL_SERVER];
const corsOptions = {
    origin: (origin,callback)=>{
        if(allowedDomains.indexOf(origin) !== -1){
            callback(null,true);
        }
        else{
            callback(new Error("Not allowed by CORS"));
            console.log(process.env.URL_SERVER);
        }
    }
}
app.use(cors(corsOptions));


app.get('/recent', async(req,res)=>{
   

    const url = 'https://image-search-abstraction-layer.freecodecamp.rocks/recent/';

    try{
        const request = await fetch(url);
        if(request.status !== 200){
            throw new Error('Failed to fetch recent searchs');
        }
        const response = await request.json();
        const uniqueArray = [...new Set(response.map(search => search.searchQuery))];
        res.json(uniqueArray);
        
    }
    catch(error){
        console.error(error);
    }
   

   
})


app.get('/search', async(req,res)=>{
    const {search,page = 1} = req.query;

    const url = `https://image-search-abstraction-layer.freecodecamp.rocks/query/${search}?page=${page}`
    try{
        if(!search || search.trim() === '') throw new Error('Search term is invalid or missing');
        if(page < 1)throw new Error('Unable to find results, please try again')
        const request = await fetch(url);
        if(request.status !== 200)throw new Error('Failed to fetch data from the API. Try again later');
        const data = await request.json();
        if(!data.images.length)throw new Error('No results found, please try again with another term');
        const updateData = data.images.map(({description,parentPage,url}) => {
            return {url,description,parentPage};
        });
        res.json(updateData);
    }
    catch(error){
        const statusCode = error.message.includes('fetching the data') ? 500 : 400;
        res.status(statusCode).json(error.message);
      
    }
})

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Server in port: ',port));