import noteHandler from '../handlers/noteHandler.js'


//this will show notes form and title is being passed dynamically
const addNote = async(req,res) => {
    console.log("hi i am in controller");
res.render('note',{
    title:"Add Note"
});
};

//this will create the note using post

const createNote = async(req,res) => {
    console.log("i am in control of creating a note");
    const tagsArray = req.body.tags
    ? req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : []; //if tags exists then split those as per , and create an array of tags, else assign an empty array

    const noteData = {
        title:req.body.title,
        content:req.body.content,
        tags:tagsArray,
        createdBy:req.user._id //this is very important part to link user with notes
    };
    const newnote = await noteHandler.createNote(noteData);
      req.flash('success', 'Note added successfully!');
      
    res.redirect('/notes');
};


const getAllNotes = async(req,res) => {
    const userID=req.user._id
    const allnotes = await noteHandler.getAllNotes(userID,);
    res.render('allnotes',{
        title:'All Notes',
        allnotes,
    });
};

//this is using slug to edit the note
const editNote = async (req, res) => {
  const note = await noteHandler.getOneNote({ slug: req.params.slug });
  res.render('editnote', {
    title: `Edit ${note.title} Note`,
    note,
  });
};

const updateNote = async (req, res) => {
  const slug = req.params.slug;

   const tagsArray = req.body.tags
    ? req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : []; //if tags exists then split those as per , and create an array of tags, else assign an empty array

    const updatednote = {
        title:req.body.title,
        content:req.body.content,
        tags:tagsArray
    }
  const noteData = updatednote;
  console.log("hi i am go to call updater")
  const note = await noteHandler.updateNote(slug, noteData);
  req.flash('success','Note is edited successfully');
  res.redirect('/notes');
};


const deleteNote = async (req,res) =>{
    const id = req.params.id;
    const deletedNote= await noteHandler.deleteNote(id);
    req.flash('success',"Note is deleted successfully");
    res.redirect('/notes');
}




export default{
    addNote,
    createNote,
    getAllNotes,
    editNote,
    updateNote,
    deleteNote,
}