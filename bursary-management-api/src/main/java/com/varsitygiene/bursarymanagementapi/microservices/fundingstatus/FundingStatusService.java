package com.varsitygiene.bursarymanagementapi.microservices.fundingstatus;

import com.varsitygiene.bursarymanagementapi.microservices.history.History;
import com.varsitygiene.bursarymanagementapi.microservices.history.HistoryService;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class FundingStatusService {
    @Autowired
    private FundingStatusRepository fundingStatusRepository;
    private HistoryService historyService;

    /**
     * Create new fundingStatus
     * @param fundingStatus
     * @param correlationId
    //* @param authentication
     * @return
     */
    public ResponseEntity save(FundingStatus fundingStatus, String correlationId) {
        try{
            log.info("cid=>{} start with create funding status function. Object => {}", correlationId, fundingStatus.toString());
            log.info("My Funding status name ==> {}", fundingStatus.getFundingStatusName());

            if (fundingStatus == null || fundingStatus.getFundingStatusName().equals("")){
                log.warn("{} : No content", correlationId);
                return ResponseEntity.noContent().build();
            }

            FundingStatus _fundingStatus = fundingStatusRepository.findByFundingStatusName(fundingStatus.getFundingStatusName());
            log.info("AFTER FETCHING My Funding status name ==> {}", fundingStatus.getFundingStatusName());

            if(_fundingStatus != null) {
                log.warn(_fundingStatus.getFundingStatusName() + " Already exists.");
                return ResponseEntity.status(409).body(new ResponseResult(409, fundingStatus.getFundingStatusName() + " Already exists", fundingStatus));
            }

            /*AppUser a = appUserService.getUserByAuthJWT(authentication);
            if(a != null) {
                region.setSourceCompany(a.getSourceCompany());
                region.setUserCreated(a);
                region.setUserUpdated(a);
            }*/
            FundingStatus f = fundingStatusRepository.save(fundingStatus);

            historyService.record(new History("new funding status", "save", "", f.getFundingStatusName(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Funding Status successfully created", fundingStatus));
        }catch (Exception e) {
            log.error("cid=>{} error on create funding status function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with create funding status function.", correlationId);
        }
    }

    public ResponseEntity update(FundingStatus fundingStatus, String correlationId) {
        try{
            log.info("cid=>{} start with update funding status function. Object => {}", correlationId, fundingStatus.toString());

            FundingStatus rr = fundingStatusRepository.findByFundingStatusName(fundingStatus.getFundingStatusName());

            if(rr != null && rr.getFundingStatusId() != fundingStatus.getFundingStatusId()) {
                log.warn(fundingStatus.getFundingStatusName() + " Already exists.");
                return ResponseEntity.status(409).body(new ResponseResult(409, fundingStatus.getFundingStatusName() + " Already exists", fundingStatus));
            }

            FundingStatus _fundingStatus = fundingStatusRepository.findById(fundingStatus.getFundingStatusId()).orElseThrow(() -> new RuntimeException("Funding status Not found"));

            //AppUser a = appUserService.getUserByAuthJWT(authentication);

            _fundingStatus.setFundingStatusName(fundingStatus.getFundingStatusName());
            FundingStatus r = fundingStatusRepository.save(_fundingStatus);

            historyService.record(new History("update funding status", "update", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Funding status successfully updated", r));
        }catch (Exception e) {
            log.error("cid=>{} error on update funding status function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with update funding status function.", correlationId);
        }
    }


    public ResponseEntity delete(long id, String correlationId) {
        try{
            log.info("cid=>{} start with delete funding status function. Object => {}", correlationId, id);

            FundingStatus _fundingStatus = fundingStatusRepository.findById(id).orElseThrow(() -> new RuntimeException("Funding Status Not found"));

            //AppUser a = appUserService.getUserByAuthJWT(authentication);

            _fundingStatus.setDeleted(1);

            FundingStatus r = fundingStatusRepository.save(_fundingStatus);

            historyService.record(new History("delete funding status", "delete", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Funding status successfully deleted", r));
        }catch (Exception e) {
            log.error("cid=>{} error on delete funding status function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with delete funding status function.", correlationId);
        }
    }

    /**
     *
     * @param pageable
     * @param searchText
     * @return
     * @throws Exception
     */
    public ResponseEntity<Page<FundingStatus>> listAllPageAble(Pageable pageable, String searchText) {
        try {
            //AppUser a = appUserService.getUserByHttpRequest(request);
            return ResponseEntity.ok().body(fundingStatusRepository.findAllBySearch(pageable, searchText));
        }catch (Exception e) {
            log.error("cid=>{} error on create listAllPageAble function.", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
