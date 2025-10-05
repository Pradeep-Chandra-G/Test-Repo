package com.pradeep.papertrail.controller;

import com.pradeep.papertrail.model.Note;
import com.pradeep.papertrail.model.NotePermission;
import com.pradeep.papertrail.model.User;
import com.pradeep.papertrail.repository.NotePermissionRepository;
import com.pradeep.papertrail.repository.NoteRepository;
import com.pradeep.papertrail.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private final NoteRepository noteRepository;
    private final NotePermissionRepository permissionRepository;
    private final UserRepository userRepository;

    public NoteController(NoteRepository noteRepository,
                          NotePermissionRepository permissionRepository,
                          UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }

    // Create a new note
    @PostMapping("/create")
    public Note createNote(@RequestBody Note note, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        note.setUser(user);
        note.setCreatedBy(user.getName());
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());

        return noteRepository.save(note);
    }

    // Get notes owned by the user
    @GetMapping("/my")
    @Transactional(readOnly = true)
    public List<Note> getMyNotes(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return noteRepository.findByUser(user);
    }

    // Get notes shared with the user (READ permission)
    @GetMapping("/shared")
    @Transactional(readOnly = true)
    public List<Note> getSharedNotes(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return permissionRepository.findByUserAndPermission(user, NotePermission.Permission.READ)
                .stream()
                .map(NotePermission::getNote)
                .filter(Objects::nonNull)
                .distinct()
                .toList();
    }

    // Update note content (only owner or EDIT permission)
    @PutMapping("/{noteId}")
    public Note updateNote(@PathVariable Long noteId,
                           @RequestBody Note updatedNote,
                           Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        boolean canEdit = note.getUser().getId().equals(user.getId()) ||
                permissionRepository.existsByNoteAndUserAndPermission(note, user, NotePermission.Permission.EDIT);

        if (!canEdit) throw new RuntimeException("No permission to edit this note");

        note.setTitle(updatedNote.getTitle());
        note.setContent(updatedNote.getContent());
        note.setUpdatedAt(LocalDateTime.now());

        return noteRepository.save(note);
    }

    // Share a note with another user
    @PostMapping("/{noteId}/share")
    public NotePermission shareNote(@PathVariable Long noteId,
                                    @RequestParam String email,
                                    @RequestParam NotePermission.Permission permission,
                                    Authentication auth) {
        User owner = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUser().getId().equals(owner.getId())) {
            throw new RuntimeException("Only owner can share the note");
        }

        User targetUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        NotePermission notePermission = new NotePermission();
        notePermission.setNote(note);
        notePermission.setUser(targetUser);
        notePermission.setPermission(permission);

        Optional<NotePermission> existing =
                permissionRepository.findByNoteAndUser(note, targetUser);

        if (existing.isPresent()) {
            existing.get().setPermission(permission); // update instead
            return permissionRepository.save(existing.get());
        }

        return permissionRepository.save(notePermission);
    }

    // Revoke a user's permission
    @DeleteMapping("/{noteId}/permissions/{userId}")
    public String revokePermission(@PathVariable Long noteId,
                                   @PathVariable Long userId,
                                   Authentication auth) {
        User owner = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUser().getId().equals(owner.getId())) {
            throw new RuntimeException("Only owner can revoke permissions");
        }

        permissionRepository.deleteByNoteIdAndUserId(noteId, userId);
        return "Permission revoked successfully";
    }

    // Delete a note (only owner)
    @DeleteMapping("/{noteId}")
    public String deleteNote(@PathVariable Long noteId, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Only owner can delete the note");
        }

        noteRepository.delete(note);
        return "Note deleted successfully";
    }
}
