package app.pradeep.ToDoApp.service;

import app.pradeep.ToDoApp.entity.Note;
import app.pradeep.ToDoApp.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note getNote(Long id) {
        return noteRepository.findById(id).get();
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public void createNote(Note note) {
        noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    public void updateNote(Note note) {
        noteRepository.save(note);
    }
}
