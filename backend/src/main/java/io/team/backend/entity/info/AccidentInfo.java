package io.team.backend.entity.info;

import io.team.backend.entity.common.Address;
import io.team.backend.entity.document.Document;
import io.team.backend.entity.person.Person;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "accident_infos")
public class AccidentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime dateTime;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address location;
    @Temporal(TemporalType.TIME)
    private LocalTime startTime;
    @Temporal(TemporalType.TIME)
    private LocalTime endTime;
    @ElementCollection
    private List<String> traumaTypes;
    private String description;
    private String causeDescription;
    private String locationDescription;
    @ManyToOne(cascade = CascadeType.ALL)
    private Help firstAid;
    @ManyToOne(cascade = CascadeType.ALL)
    private Help investigation;
    @ManyToOne(cascade = CascadeType.ALL)
    private EquipmentInfo equipmentInfo;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Witness> witnesses;
    @ManyToOne(cascade = CascadeType.ALL)
    private Person person;
    @OneToOne(cascade = CascadeType.ALL)
    private Document document;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        AccidentInfo that = (AccidentInfo) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
