import React, { useEffect, useState } from "react";

function NotesList() {
  const URL = "http://localhost:8080/notes";
  const [notes, setNotes] = useState([]); // store fetched notes

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note.id}
            className="border p-4 rounded shadow bg-white text-black"
          >
            <h2 className="font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.status}</p>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-white">
          No Notes Created Yet!
        </p>
      )}
    </div>
  );
}

export default NotesList;
