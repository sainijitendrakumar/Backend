import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
       videoFile:{
        type:String, //cloudinary url
        required:true
       },
       thumbnail:{
             type:string, //cloudnary url
             required:true
       },
       title:{
        type:String, //Cloudnary url
        required:true
       },
       description:{
        type:String, //Cloudnary url
        required:true
       },
       duration:{
        type:Number,
        required:true
       },
       views:{
        type:Number,
        default:0
       },
       isPublished:{
        type:Boolean,
        default:true
       },
       owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
       }
    },

    {
        timestamps:true
    }
)


export const Video = mongoose.model("Video",videoSchema)