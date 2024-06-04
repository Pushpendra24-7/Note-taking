const btnE = document.getElementById("btn");
const appE = document.getElementById("app");

getNote().forEach((note) => {
    const noteE = createNoteE(note.id , note.content); 
    appE.insertBefore(noteE , btnE); 
});







function createNoteE(id , content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note" ; 
    element.value = content ; 

    element.addEventListener("dblclick" , ()=>
    {
        const warning = confirm("Are you sure want to delete ?")
        if(warning){
            deleteNote (id , element)
        }
    })
    element.addEventListener("input" , ()=> {
        updateNote(id ,element.value);

    });
    
    return element;
}


function deleteNote(id , element){
  const notes = getNote().filter((note) => note.id != id )
  saveNote(notes);
  appE.removeChild(element)
}

function updateNote(id , content){
    const notes = getNote()
    const target = notes.filter((note => note.id == id )[0]);

    target.content = content ; 
    saveNote(notes);
}








function addNote(){
    const notes = getNote();
    const noteobj = {
        id: Math.floor(Math.random()*1000000),
        content:"",   };
        const noteE = createNoteE(noteobj.id , noteobj.content)
        appE.insertBefore(noteE , btnE);

        notes.push(noteobj);

// storying to local storage
        saveNote(notes)


}



function saveNote(notes){
    localStorage.setItem("note-app" , JSON.stringify(notes));
}

function getNote(){
    return JSON.parse(localStorage.getItem("note-app") || "[]")
}


btnE.addEventListener("click" , addNote);