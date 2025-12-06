package io.team.backend.repository;

import io.team.backend.entity.info.AccidentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccidentInfoRepository extends JpaRepository<AccidentInfo, UUID> {
}
