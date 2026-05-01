package com.auditvault.security;

import com.auditvault.entity.User;
import com.auditvault.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        List<SimpleGrantedAuthority> authorities = user.getUserRoles().stream()
                .map(ur -> new SimpleGrantedAuthority("ROLE_" + ur.getRole().getName()))
                .toList();

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPasswordHash(), authorities);
    }
}
