package io.team.backend.dto.person;

import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PersonRequest {
    @NotBlank
    private String pesel;
    @NotNull
    private IdentityRequest identity;
    @NotBlank
    private String name;
    @NotNull
    private BirthRequest birth;
    @NotBlank
    private String phoneNumber;
    @NotNull
    private AddressRequest residentialAddress;
    private AddressRequest lastKnownAddress;
    private CorrespondenceAddressRequest correspondenceAddress;
}
