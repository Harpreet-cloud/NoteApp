import Note from '../models/noteSchema.js';


const createNote = async(noteData) => {
    console.log("note is in createNote handler",noteData);
    return await Note.create(noteData);
}


const getAllNotes = async(userID) => {
    console.log(" i am getting all notes for a user");
return await Note.find({createdBy:userID}).sort({ createdAt: -1 }).lean(); //show notes only related to user
}

const getOneNote = async({slug}) =>{
    console.log("i am getting one note");
    return await Note.findOne({slug}).lean();

}
const updateNote = async (slug, noteData) => {
    console.log("i am going to update note")
  return await Note.findOneAndUpdate({slug}, noteData, {
    new: true,
    runValidators: true,
  }).lean();
};

const deleteNote = async(slug) =>{
    console.log("i am deleteing this note");
    return await Note.findByIdAndDelete(slug).lean();
}











export default {
    createNote,
    getAllNotes,
    getOneNote,
    updateNote,
    deleteNote

} 