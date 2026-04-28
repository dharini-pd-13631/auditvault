package com.auditvault.service;

import com.auditvault.dto.response.UserResponse;
import com.auditvault.entity.*;
import com.auditvault.exception.*;
import com.auditvault.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(this::toResponse).toList();
    }

    public UserResponse getUserById(UUID id) {
        return toResponse(findUser(id));
    }

    @Transactional
    public void assignRole(UUID userId, String roleName, UUID assignedById) {
        User user = findUser(userId);
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleName));

        if (userRoleRepository.existsByUserIdAndRoleId(userId, role.getId())) {
            throw new DuplicateResourceException("User already has role: " + roleName);
        }

        User assignedBy = findUser(assignedById);

        UserRole userRole = UserRole.builder()
                .user(user).role(role).assignedBy(assignedBy).build();
        userRoleRepository.save(userRole);
    }

    @Transactional
    public void removeRole(UUID userId, String roleName) {
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleName));
        userRoleRepository.deleteByUserIdAndRoleId(userId, role.getId());
    }

    private User findUser(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    private UserResponse toResponse(User user) {
        List<String> roles = user.getUserRoles().stream()
                .map(ur -> ur.getRole().getName()).toList();
        return UserResponse.builder()
                .id(user.getId()).fullName(user.getFullName())
                .email(user.getEmail()).phone(user.getPhone())
                .firmName(user.getFirmName()).isActive(user.getIsActive())
                .roles(roles).createdAt(user.getCreatedAt())
                .build();
    }
}
