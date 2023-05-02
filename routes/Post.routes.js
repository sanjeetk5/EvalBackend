const express = require("express")
const { PostModel } = require("../model/Post.model")
const postRouter = express.Router()



postRouter.post("/create" , async(req,res)=>{
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg" : "New post is created"})
    } catch (err) {
        res.status(400).send({err: err.message})
    }
})


postRouter.get("/" , async(req,res)=>{
    try {
        const note = await PostModel.find({postID : req.body.postID})
        res.status(200).send(note)
    } catch (err) {
        res.status(400).send({err:err.message})
    }
})


postRouter.patch("/update/:postID" , async(req,res)=>{
    const {postID} = req.params;
    const post = await PostModel.findOne({_id : postID })
    try {
        if(req.body.postID == post.postID){
            await PostModel.findByIdAndUpdate({_id : postID} , req.body)
            res.status(200).send({"msg" : `The note with id: ${noteID} is updated`})
        }else{
            res.status(400).send({"err" : "you are not authorized to update"})
        }
    } catch (err) {
        res.status(400).send({err:err.message})
    }

})


postRouter.delete("/delete/:postID" , async(req,res)=>{
    const {postID} = req.params;
    const post = await PostModel.findOne({_id : postID })
    try {
        if(req.body.postID == post.postID){
            await PostModel.findByIdAndDelete({_id : postID} , req.body)
            res.status(200).send({"msg" : `The note with id: ${noteID} is deleted`})
        }else{
            res.status(400).send({"err" : "you are not authorized to delete"})
        }
    } catch (err) {
        res.status(400).send({err:err.message})
    }

})


module.exports = {
    postRouter
}