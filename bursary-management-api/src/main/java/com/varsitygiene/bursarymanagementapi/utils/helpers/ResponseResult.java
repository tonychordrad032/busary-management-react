package com.varsitygiene.bursarymanagementapi.utils.helpers;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseResult {
    private int responseCode;
    private String responseMessage;
    private Object results;

    public ResponseResult(int responseCode, String responseMessage, Object results) {
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
        this.results = results;
    }
}
