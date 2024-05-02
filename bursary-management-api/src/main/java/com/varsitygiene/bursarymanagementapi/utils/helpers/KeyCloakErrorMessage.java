package com.varsitygiene.bursarymanagementapi.utils.helpers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KeyCloakErrorMessage {
    private String errorMessage;
    private String error;
}
