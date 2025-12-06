package io.team.backend.repository;

import io.team.backend.entity.PersonSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PersonSessionRepository extends JpaRepository<PersonSession, UUID> {
}
