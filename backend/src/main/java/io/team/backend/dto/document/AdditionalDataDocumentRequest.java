package io.team.backend.dto.document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AdditionalDataDocumentRequest {
    @NotBlank
    private String name;
    @NotNull
    private MultipartFile file;
}
