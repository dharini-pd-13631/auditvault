package com.auditvault.controller;

import com.auditvault.dto.request.AssignRoleRequest;
import com.auditvault.dto.response.UserResponse;
import com.auditvault.entity.User;
import com.auditvault.exception.ResourceNotFoundException;
import com.auditvault.repository.UserRepository;
import com.auditvault.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserResponse>> listUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<UserResponse> getUser(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/{id}/roles")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<Void> assignRole(@PathVariable UUID id,
                                           @Valid @RequestBody AssignRoleRequest request,
                                           Authentication auth) {
        User currentUser = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", auth.getName()));
        userService.assignRole(id, request.getRoleName(), currentUser.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/roles/{roleName}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Void> removeRole(@PathVariable UUID id, @PathVariable String roleName) {
        userService.removeRole(id, roleName);
        return ResponseEntity.noContent().build();
    }
}
