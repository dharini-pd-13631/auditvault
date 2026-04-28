package com.auditvault.repository;

import com.auditvault.entity.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface RolePermissionRepository extends JpaRepository<RolePermission, UUID> {
    List<RolePermission> findByRoleId(UUID roleId);
    List<RolePermission> findByRoleIdIn(List<UUID> roleIds);
    boolean existsByRoleIdAndResourceAndAction(UUID roleId, String resource, String action);
}
