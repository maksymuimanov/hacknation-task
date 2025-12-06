package io.team.backend.repository;

import io.team.backend.entity.person.ProxyPerson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProxyPersonRepository extends JpaRepository<ProxyPerson, UUID> {
}
