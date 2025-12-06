package io.team.backend.repository;

import io.team.backend.entity.AccidentInfoSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccidentInfoSessionRepository extends JpaRepository<AccidentInfoSession, UUID> {
}
