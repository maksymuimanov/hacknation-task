package io.team.backend.entity.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "additional_data")
public class AdditionalData {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @Transient
    private MultipartFile file;
    private String path;
}
