import Movies from "../model/movieSchema.js"

export const getAllMovies=async(req,res)=>{
    try{
       const movies= await Movies.find({})

        if(movies.lenth==0){
           return res.status(200).json({message:"no movies found"});
        }
        return res.status(200).json(movies);
    }catch(e){
      console.log("Internal Error")
    }

}