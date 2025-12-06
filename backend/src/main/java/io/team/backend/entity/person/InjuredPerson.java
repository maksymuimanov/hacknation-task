package io.team.backend.entity.person;

import io.team.backend.entity.common.Address;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "injured_persons")
public class InjuredPerson extends Person {
    @ManyToOne
    private Address businessAddress;
    @ManyToOne
    private ProxyPerson proxyPerson;
}
