const Blog = require("./blog.model.js");

exports.create = (req,res)=>{
    if(!req.body){
        return res.send({
            message :"Blog cannot be Empty!"
        });
    }
    const blog = new Blog({
        name :req.body.name,
        description : req.body.description
    });
    blog.save()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.send({
            message : "Something Went Wrong!"
        })
    })
};

exports.findOne =(req,res)=>{
    Blog.find({name:req.params.name})
    .then(blog=>{
        if(!blog){
            return res.send({
                message : "Blog Not Associated with this Name"
            })
        }
        res.send(blog);
    })
    .catch(err =>{
        res.send({
            message :"Some Error has Occurred while retrieving blog with Name" + req.params.name
        })
    })
}
exports.findAll =(req,res)=>{
    Blog.find()
    .then(blogs=>{
        
        res.send(blogs);
    })
    .catch(err=>{
        res.send({
            message :"No Blogs Are Formed Yet!"
        })
    })
}
exports.update = (req,res)=>{
    if(!req.body){
        return res.send({
            message : "Blog Can't Be Empty"
        });
    }
    Blog.findOneAndUpdate({name:req.params.name}, {
        name:req.body.name,
        description : req.body.description
    },{new:true})
    .then(blog=>{
        if(!blog){
            return res.send({
                message : "Blog Not Found With Name " + req.params.name
            })
        }
        res.send(blog);
    }).catch(err=>{
        return res.send({
            message : "Something Went Wrong in Updating Blog with Name " + req.params.name
        })
    })
};

exports.delete=(req,res)=>{
    Blog.findOneAndDelete({name:req.params.name})
    .then(blog=>{
        if(!blog){
            return res.send({
                message  : "Blog Not Found With this Name" + req.params.name
            })
            
        }
        res.send({message : "Blog Deleted SuccessFully!"});
    })
    .catch(err=>{
        return res.send({
            message : "Something Went Wrong While Deleting Blog With Name " + req.params.name
        })
    })
};