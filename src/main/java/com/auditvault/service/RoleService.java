package com.auditvault.service;

import com.auditvault.entity.Role;
import com.auditvault.exception.DuplicateResourceException;
import com.auditvault.exception.ResourceNotFoundException;
import com.auditvault.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(UUID id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));
    }

    public Role createRole(String name, String displayName, String description) {
        if (roleRepository.existsByName(name)) {
            throw new DuplicateResourceException("Role already exists: " + name);
        }
        Role role = Role.builder().name(name).displayName(displayName).description(description).build();
        return roleRepository.save(role);
    }
}
