package io.team.backend.entity.person;

import io.team.backend.entity.common.Address;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Persistable;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "correspondence_addresses")
public class CorrespondenceAddress extends Address {
    @Enumerated(EnumType.STRING)
    private Type type;
    @ManyToOne(fetch = FetchType.LAZY)
    private PosteRestante posteRestante;
    @ManyToOne(fetch = FetchType.LAZY)
    private PoBox poBox;

    public enum Type {
        ADDRESS, POSTE_RESTANTE, PO_BOX
    }

    @Getter @Setter
    @RequiredArgsConstructor
    @Entity
    @Table(name = "po_boxex")
    public static class PoBox implements Persistable<String> {
        @Id
        private String postOfficeName;
        private String zipCode;
        private String number;

        @Override
        public String getId() {
            return postOfficeName;
        }

        @Override
        public boolean isNew() {
            return this.getId() == null;
        }
    }

    @Getter @Setter
    @RequiredArgsConstructor
    @Entity
    @Table(name = "poste_restantes")
    public static class PosteRestante implements Persistable<String> {
        @Id
        private String postOfficeName;
        private String zipCode;

        @Override
        public String getId() {
            return postOfficeName;
        }

        @Override
        public boolean isNew() {
            return this.getId() == null;
        }
    }
}
