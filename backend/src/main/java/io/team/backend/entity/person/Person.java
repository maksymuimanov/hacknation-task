package io.team.backend.entity.person;

import io.team.backend.entity.common.Address;
import io.team.backend.entity.info.AccidentInfo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(length = 512)
    private String pesel;
    @OneToOne(cascade = CascadeType.ALL)
    private Identity identity;
    @Column(length = 512)
    private String name;
    @ManyToOne(cascade = CascadeType.ALL)
    private Birth birth;
    @Column(length = 512)
    private String phoneNumber;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address residentialAddress;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address lastKnownAddress;
    @ManyToOne(cascade = CascadeType.ALL)
    private CorrespondenceAddress correspondenceAddress;
    @OneToMany(cascade = CascadeType.ALL)
    private List<AccidentInfo> accidentInfos;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Person that = (Person) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
