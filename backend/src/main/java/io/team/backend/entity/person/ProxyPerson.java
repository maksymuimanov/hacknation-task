package io.team.backend.entity.person;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "proxy_persons")
public class ProxyPerson extends Person {
    @ToString.Exclude
    @OneToOne(cascade = CascadeType.ALL)
    private InjuredPerson injuredPerson;
}
