const mongoose = require('mongoose');
const Url = require("./model.js")
const generateRandomChars = require('./randomCharacters')



module.exports = async function (context, req) {

    

    const {url, shrunkUrl} = req.query

    let extraChars = shrunkUrl || generateRandomChars(5)


    

    await mongoose.connect('mongodb://localhost/shortener', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> context.log("connected to Mongo..."))
    .catch(err=> context.error("could not connect to db", err))
    context.log('JavaScript HTTP trigger function processed a request.');
    // context.log(req.body.url)

 
    const urlObject = new Url({
        url: url,
        shrunkUrl: extraChars
    })

    let docExists = await Url.exists({key: url});
    context.log(docExists)
    if(docExists){
        return  context.res = {
            body: docExists
        };

    }
    console.log(docExists); 
    let result;
    try {
        result = await urlObject.save()
    } catch (error) {
         context.log(error)
    }
   
    context.res = {
        body: result
    };
}