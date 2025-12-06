package io.team.backend.repository;

import io.team.backend.entity.DocumentSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DocumentSessionRepository extends JpaRepository<DocumentSession, UUID> {
}
