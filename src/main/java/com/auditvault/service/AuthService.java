package com.auditvault.service;

import com.auditvault.dto.request.LoginRequest;
import com.auditvault.dto.request.RegisterRequest;
import com.auditvault.dto.response.AuthResponse;
import com.auditvault.entity.*;
import com.auditvault.exception.DuplicateResourceException;
import com.auditvault.exception.ResourceNotFoundException;
import com.auditvault.repository.*;
import com.auditvault.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + req.getEmail());
        }

        User user = User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .phone(req.getPhone())
                .firmName(req.getFirmName())
                .build();
        userRepository.save(user);

        String roleName = (req.getRoleName() != null) ? req.getRoleName() : "COMPLIANCE_AUDITOR";
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleName));

        UserRole userRole = UserRole.builder().user(user).role(role).build();
        userRoleRepository.save(userRole);

        List<String> roles = List.of(role.getName());
        String token = tokenProvider.generateToken(user.getEmail(), roles);

        return AuthResponse.builder()
                .token(token).email(user.getEmail())
                .fullName(user.getFullName()).roles(roles)
                .build();
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", req.getEmail()));

        List<String> roles = user.getUserRoles().stream()
                .map(ur -> ur.getRole().getName()).toList();

        String token = tokenProvider.generateToken(user.getEmail(), roles);

        return AuthResponse.builder()
                .token(token).email(user.getEmail())
                .fullName(user.getFullName()).roles(roles)
                .build();
    }
}
