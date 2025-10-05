package app.pradeep.ToDoApp.controller;

import app.pradeep.ToDoApp.entity.Task;
import app.pradeep.ToDoApp.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getNote(@PathVariable Long id) {
        return taskService.getTask(id);
    }

    @PostMapping
    public ResponseEntity<String> createNote(@RequestBody Task task) {
        taskService.createTask(task);
        return ResponseEntity.ok("Task created");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateNote(@PathVariable Long id,  @RequestBody Task task) {
        if(taskService.getTask(id) == null) {
            return ResponseEntity.notFound().build();
        }
        taskService.updateTask(task);
        return ResponseEntity.ok("Task updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted");
    }
}
