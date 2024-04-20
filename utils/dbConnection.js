import mongoose from "mongoose";

const dbConection = ()=> {
    return mongoose.connect('mongodb+srv://sugrivmlvt:XGgorux6RVZqsPRr@cluster0.pkscyjy.mongodb.net/')
}
export default  dbConection