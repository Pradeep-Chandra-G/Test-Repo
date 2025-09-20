package app.pradeep.ToDoApp.controller;

import app.pradeep.ToDoApp.entity.Note;
import app.pradeep.ToDoApp.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<Note> getNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/{id}")
    public Note getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }

    @PostMapping
    public ResponseEntity<String> createNote(@RequestBody Note note) {
        noteService.createNote(note);
        return ResponseEntity.ok("Note created");
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> updateNote(@PathVariable Long id,  @RequestBody Note note) {
        if(noteService.getNote(id) == null) {
            return ResponseEntity.notFound().build();
        }
        noteService.updateNote(note);
        return ResponseEntity.ok("Note updated");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteNote(@RequestBody Note note) {
        noteService.deleteNote(note.getId());
        return ResponseEntity.ok("Note deleted");
    }
}
