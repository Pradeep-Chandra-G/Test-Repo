package app.pradeep.ToDoApp.repository;

import app.pradeep.ToDoApp.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
