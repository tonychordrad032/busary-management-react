package com.varsitygiene.bursarymanagementapi.microservices.qualification;

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
public class QualificationService {

    private QualificationRepository qualificationRepository;

    private HistoryService historyService;


    /**
     * Create new qualification
     * @param qualification
     * @param correlationId
    //* @param authentication
     * @return
     */
    public ResponseEntity save(Qualification qualification, String correlationId){
        try{
        log.info("cid=>{} start with create qualification function. Object => {}", correlationId);

        Qualification _qualification = qualificationRepository.findByQualificationName(qualification.getQualificationName());

        if(_qualification != null) {
            log.warn(qualification + " Already exists.");
            return ResponseEntity.status(409).body(new ResponseResult(409, qualification.getQualificationName() + " Already exists", qualification));
        }

            /*AppUser a = appUserService.getUserByAuthJWT(authentication);
            if(a != null) {
                region.setSourceCompany(a.getSourceCompany());
                region.setUserCreated(a);
                region.setUserUpdated(a);
            }*/
            Qualification q = qualificationRepository.save(qualification);

            historyService.record(new History("new qualification", "save", "", q.getQualificationName(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Qualification successfully created", qualification));
        }catch (Exception e) {
            log.error("cid=>{} error on create qualification function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with create qualification function.", correlationId);
        }
    }

    public ResponseEntity update(Qualification qualification, String correlationId) {
        try{
            log.info("cid=>{} start with update qualification function. Object => {}", correlationId, qualification.toString());

            Qualification rr = qualificationRepository.findByQualificationName(qualification.getQualificationName());

            if(rr != null && rr.getQualificationId() != qualification.getQualificationId()) {
                log.warn(qualification.getQualificationName() + " Already exists.");
                return ResponseEntity.status(409).body(new ResponseResult(409, qualification.getQualificationName() + " Already exists", qualification));
            }

            Qualification _qualification = qualificationRepository.findById(qualification.getQualificationId()).orElseThrow(() -> new RuntimeException("Qualification Not found"));

            //AppUser a = appUserService.getUserByAuthJWT(authentication);

            _qualification.setQualificationName(qualification.getQualificationName());
            _qualification.setInstitution(qualification.getInstitution());
            _qualification.setEnrolmentStatus(qualification.getEnrolmentStatus());

            Qualification r = qualificationRepository.save(_qualification);

            historyService.record(new History("update qualification", "update", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Qualification successfully updated", r));
        }catch (Exception e) {
            log.error("cid=>{} error on update qualification function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with update qualification function.", correlationId);
        }
    }


    public ResponseEntity delete(long id, String correlationId) {
        try{
            log.info("cid=>{} start with delete qualification function. Object => {}", correlationId, id);

            Qualification _qualification = qualificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Qualification Not found"));

            //AppUser a = appUserService.getUserByAuthJWT(authentication);

            _qualification.setDeleted(1);

            Qualification r = qualificationRepository.save(_qualification);

            historyService.record(new History("delete qualification", "delete", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Qualification successfully deleted", null));
        }catch (Exception e) {
            log.error("cid=>{} error on delete qualification function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with delete qualification function.", correlationId);
        }
    }

    /**
     *
     * @param pageable
     * @param searchText
     * @return
     * @throws Exception
     */
    public ResponseEntity<Page<Qualification>> listAllPageAble(Pageable pageable, String searchText) {
        try {
            //AppUser a = appUserService.getUserByHttpRequest(request);
            return ResponseEntity.ok().body(qualificationRepository.findAllBySearch(pageable, searchText));
        }catch (Exception e) {
            log.error("cid=>{} error on create listAllPageAble function.", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
