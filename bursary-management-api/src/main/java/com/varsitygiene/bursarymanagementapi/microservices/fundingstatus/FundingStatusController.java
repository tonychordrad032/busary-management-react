package com.varsitygiene.bursarymanagementapi.microservices.fundingstatus;

import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/funding-status")
public class FundingStatusController {
    private FundingStatusService fundingStatusService;

    private FundingStatusRepository fundingStatusRepository;

    @PostMapping
    //@RolesAllowed({"admin", "user"})
    public ResponseEntity save(@RequestBody FundingStatus fundingStatus) {
        String correlationId = UUID.randomUUID().toString();
        return fundingStatusService.save(fundingStatus, correlationId);
    }

    @GetMapping
    public ResponseEntity<ResponseResult> listAll(){
        return ResponseEntity.ok().body(new ResponseResult(200, "List of funding status", fundingStatusRepository.findAll()));
    }

    @PutMapping
    public ResponseEntity update(@RequestBody FundingStatus fundingStatus){
        String correlationId = UUID.randomUUID().toString();
        return fundingStatusService.update(fundingStatus, correlationId);
    }

    @DeleteMapping
    public ResponseEntity delete(@RequestParam("id") long id){
        String correlationId = UUID.randomUUID().toString();
        return fundingStatusService.delete(id, correlationId);
    }
}
