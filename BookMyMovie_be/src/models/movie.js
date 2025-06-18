const mongoose=require('mongoose');

const moviesSchema=new mongoose.Schema({
    movieName:{
        type:String,
        required:true,
    },
    movieDescription:{
        type:String,
        required:true,
    },
    movieImg:{
        type:String,
        required:true,
    },
    genres:{
        type:[],
        required:true,
    },
    releaseDate:{
        type:String,
        required:true,
    },
    originalLanguage:{
        type:String,
        required:true
    },
    runtime:{
        type:String,
        required:true,
    },
    casts:{
        type:[],
        required:true,
    }
},{
    timestamps:true,
});

module.exports=mongoose.model('Movies',moviesSchema);