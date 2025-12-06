package io.team.backend.dto.person;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PersonRequest {
    @NotBlank
    private String pesel;
    @NotNull
    private DocumentRequest documentRequest;
    @NotBlank
    private String name;
    @NotNull
    private BirthRequest birthRequest;
    @NotBlank
    private String phoneNumber;
    @NotNull
    private AddressRequest residentialAddress;
    private AddressRequest lastKnownAddress;
    private CorrespondenceAddressRequest correspondenceAddress;
}
