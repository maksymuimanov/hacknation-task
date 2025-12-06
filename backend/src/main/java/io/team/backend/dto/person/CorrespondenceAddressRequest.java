package io.team.backend.dto.person;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CorrespondenceAddressRequest extends AddressRequest {
    @NotNull
    private Type type;
    private PosteRestante posteRestante;
    private PoBox poBox;

    public enum Type {
        ADDRESS, POSTE_RESTANTE, PO_BOX
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PoBox extends PosteRestante {
        @NotBlank
        private String number;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PosteRestante {
        @NotBlank
        private String zipCode;
        @NotBlank
        private String postOfficeName;
    }
}