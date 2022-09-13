import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/tests")
    .then((db => console.log("DB connected")))
    .catch(error => console.log(error))