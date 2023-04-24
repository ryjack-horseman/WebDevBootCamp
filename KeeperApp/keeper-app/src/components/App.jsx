import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

    const [items, setItems] = useState([]);

    function addNote(note){
        setItems(prevNotes => {
            return [...prevNotes, note];
        });
    }

    function deleteNote(id){
        setItems(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
          <Header />
          <CreateArea
          onAdd={addNote} />

          <div>
            <ul>
                {items.map((noteItem, index) => (
                    <Note key={index} id={index} title={noteItem.title} content={noteItem.content} onDelete={deleteNote}/>
                ))}
            </ul>
          </div>
          <Footer />
        </div>
      );
}

export default App;