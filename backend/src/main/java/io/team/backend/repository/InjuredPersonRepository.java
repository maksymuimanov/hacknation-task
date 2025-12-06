package io.team.backend.repository;

import io.team.backend.entity.person.InjuredPerson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface InjuredPersonRepository extends JpaRepository<InjuredPerson, UUID> {
    Optional<InjuredPerson> findInjuredPersonByPeselOrName(String pesel, String name);
}
