package io.team.backend.entity.person;

import io.team.backend.entity.common.Address;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "correspondence_addresses")
public class CorrespondenceAddress extends Address {
    @Enumerated(EnumType.STRING)
    private Type type;
    @ManyToOne(cascade = CascadeType.ALL)
    private PosteRestante posteRestante;
    @ManyToOne(cascade = CascadeType.ALL)
    private PoBox poBox;

    public enum Type {
        ADDRESS, POSTE_RESTANTE, PO_BOX
    }

    @Getter @Setter
    @RequiredArgsConstructor
    @Entity
    @Table(name = "po_boxex")
    public static class PoBox {
        @Id
        @GeneratedValue
        private Long id;
        @Column(length = 512)
        private String postOfficeName;
        @Column(length = 512)
        private String zipCode;
        @Column(length = 512)
        private String number;
    }

    @Getter @Setter
    @RequiredArgsConstructor
    @Entity
    @Table(name = "poste_restantes")
    public static class PosteRestante {
        @Id
        @GeneratedValue
        private Long id;
        @Column(length = 512)
        private String postOfficeName;
        @Column(length = 512)
        private String zipCode;
    }
}
