package com.varsitygiene.bursarymanagementapi.microservices.fundingstatus;

import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
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
    @RolesAllowed({"admin", "user"})
    public ResponseEntity listAll(Pageable pageable, @RequestParam String searchText){
        return fundingStatusService.listAllPageAble(pageable, searchText);
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
