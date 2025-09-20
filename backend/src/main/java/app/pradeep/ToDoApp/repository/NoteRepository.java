package app.pradeep.ToDoApp.repository;

import app.pradeep.ToDoApp.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

}
