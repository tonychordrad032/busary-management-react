package com.varsitygiene.bursarymanagementapi.microservices.application;

import com.varsitygiene.bursarymanagementapi.microservices.history.History;
import com.varsitygiene.bursarymanagementapi.microservices.history.HistoryService;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@AllArgsConstructor
public class BursaryApplicationService {
    private BursaryApplicationRepository bursaryApplicationRepository;
    private HistoryService historyService;


    /**
     * Create new bursaryApplication
     * @param bursaryApplication
     * @param correlationId
    //* @param authentication
     * @return
     */
    public ResponseEntity save(BursaryApplication bursaryApplication, String correlationId){
        try{
            log.info("cid=>{} start with create bursary application function. Object => {}", correlationId);
            if(bursaryApplication == null){
                log.warn("No content");
                throw new Exception("No Content");
            }

            //BursaryApplication _bursaryApplication = bursaryApplicationRepository.findByQualificationName(qualification.getQualificationName());

//            if(_qualification != null) {
//                log.warn(qualification + " Already exists.");
//                return ResponseEntity.status(409).body(new ResponseResult(409, qualification.getQualificationName() + " Already exists", qualification));
//            }

            /*AppUser a = appUserService.getUserByAuthJWT(authentication);
            if(a != null) {
                region.setSourceCompany(a.getSourceCompany());
                region.setUserCreated(a);
                region.setUserUpdated(a);
            }*/
            BursaryApplication b = bursaryApplicationRepository.save(bursaryApplication);

            historyService.record(new History("new bursary application", "save", "","", null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Application successfully created", bursaryApplication));
        }catch (Exception e) {
            log.error("cid=>{} error on create application function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with create bursary application function.", correlationId);
        }
    }

    public ResponseEntity<Page<BursaryApplication>> listAllPageAble(Pageable pageable, String searchText) {
        try {
            //AppUser a = appUserService.getUserByHttpRequest(request);
            return ResponseEntity.ok().body(bursaryApplicationRepository.findAllBySearch(pageable, searchText));
        }catch (Exception e) {
            log.error("cid=>{} error on create listAllPageAble function.", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
