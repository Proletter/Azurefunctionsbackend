const mongoose = require('mongoose');
const Url = require("../shortner/model.js")

module.exports = async function (context, req) {

    await mongoose.connect('mongodb://localhost/shortener', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> context.log("connected to Mongo..."))
    .catch(err=> context.error("could not connect to db", err))
    context.log('JavaScript HTTP trigger function processed a request.');
    const {url,shrunkUrl} = req.query

    try {
       let result = await Url.find({ shrunkUrl: shrunkUrl});
       context.res = {
           body: result
       }
       
    } catch (error) {
        context.log(error)
    }
   
   
}