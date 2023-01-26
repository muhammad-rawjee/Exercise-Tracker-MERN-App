import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    reps: { type: Number, min:1, required: true},
    weight: { type: Number, min:1, required: true},
    unit: { type: String, enum:['kgs', 'lbs'], required: true },
    date: { type: String, match: /^\d\d-\d\d-\d\d$/, required: true }
});

function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

const Exercise = mongoose.model("Exercise", exerciseSchema)

const createExercise = async(name,reps,weight,unit,date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date})
    return exercise.save()
}

const findExercises = async (filter) => {
    const query = Exercise.find(filter)
    return query.exec()
}

const findExerciseById = async(_id) => {
    const query = Exercise.findById({ _id: _id })
    return query.exec()
}

const replaceExercise = async(_id,name,reps,weight,unit,date) => {
    if (isDateValid(date) == true){
        const result = await Exercise.updateOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
        return result.modifiedCount;
    }
}

const deleteById = async(_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}


// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createExercise, findExercises, findExerciseById, replaceExercise, deleteById};