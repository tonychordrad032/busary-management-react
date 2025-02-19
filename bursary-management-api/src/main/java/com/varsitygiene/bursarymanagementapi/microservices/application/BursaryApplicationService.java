package com.varsitygiene.bursarymanagementapi.microservices.application;

import com.varsitygiene.bursarymanagementapi.microservices.document.DocumentRepository;
import com.varsitygiene.bursarymanagementapi.microservices.history.History;
import com.varsitygiene.bursarymanagementapi.microservices.history.HistoryService;
import com.varsitygiene.bursarymanagementapi.microservices.users.User;
import com.varsitygiene.bursarymanagementapi.microservices.users.UserService;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@Log4j2
@AllArgsConstructor
public class BursaryApplicationService {
    private BursaryApplicationRepository bursaryApplicationRepository;
    private HistoryService historyService;

    private DocumentRepository documentRepository;

    private UserService userService;


    /**
     * Create new bursaryApplication
     * @param bursaryApplication
     * @param correlationId
    //* @param authentication
     * @return
     */
    public ResponseEntity save(BursaryApplication bursaryApplication, String correlationId, Authentication authentication){
        try{
            log.info("cid=>{} start with create bursary application function. Object => {}", correlationId);
            if(bursaryApplication == null){
                log.warn("No content");
                throw new Exception("No Content");
            }

            User a = userService.getUserByAuthJWT(authentication);
            if(a != null) {
                bursaryApplication.setUserCreated(a);
                bursaryApplication.setUserUpdated(a);
            }
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

    public ResponseEntity<Page<BursaryApplication>> listAllPageAble(Pageable pageable, String searchText, HttpServletRequest request) {
        try {
            User user = userService.getUserByHttpRequest(request);
            log.info("My Logged in user is : {} with userId -> {}", user.getFirstName(), user.getUserId());
            if("Administrator".equalsIgnoreCase(user.getUserType())) {
                log.info("ADMIN SIDE LIST");
                return ResponseEntity.ok().body(bursaryApplicationRepository.findAllBySearchAdmin(pageable, searchText));
            }else{
                log.info("USER SIDE LIST");
                return ResponseEntity.ok().body(bursaryApplicationRepository.findAllBySearch(pageable, user.getUserId()));
            }
        }catch (Exception e) {
            log.error("cid=>{} error on create listAllPageAble function.", e);
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Update bursaryApplication
     */
    public ResponseEntity update(BursaryApplication bursaryApplication, String correlationId, Authentication authentication) {
        try {
            log.info("{} : Start updating bursary application", correlationId);

            if (bursaryApplication == null){
                log.warn("{} : no content", correlationId);
                return ResponseEntity.noContent().build();
            }

            log.info("MY BURSARY ID => {}", bursaryApplication.getBursaryApplicationId());

            BursaryApplication _bursaryApplication = bursaryApplicationRepository.findById(bursaryApplication.getBursaryApplicationId()).orElseThrow(() -> new RuntimeException("Bursary application Not found"));


            User userUpdating = userService.getUserByAuthJWT(authentication);


            _bursaryApplication.setUserUpdated(userUpdating);
            _bursaryApplication.setApplicationStatus(bursaryApplication.getApplicationStatus());

            // General  Information
            _bursaryApplication.setFundingStatus(bursaryApplication.getFundingStatus());
            _bursaryApplication.setFundingType(bursaryApplication.getFundingType());
            _bursaryApplication.setFundingAwaiting(bursaryApplication.getFundingAwaiting());

            // Personal Details
            log.info("The Student Updating Bursary application");
            User user = new User();
            user.setUserId(bursaryApplication.getApplicant().getUserId());
            user.setFirstName(bursaryApplication.getApplicant().getFirstName());
            user.setLastName(bursaryApplication.getApplicant().getLastName());
            user.setIdentityNumber(bursaryApplication.getApplicant().getIdentityNumber());
            user.setMobile(bursaryApplication.getApplicant().getMobile());
            user.setStudentNumber(bursaryApplication.getStudentNumber());
            user.setGender(bursaryApplication.getApplicant().getGender());
            user.setRace(bursaryApplication.getApplicant().getRace());
            user.setDisability(bursaryApplication.getApplicant().getDisability());
            user.setAge(bursaryApplication.getApplicant().getAge());
            user.setHomeLanguage(bursaryApplication.getApplicant().getHomeLanguage());
            user.setCitizenship(bursaryApplication.getApplicant().getCitizenship());
            user.setCountryOfBirth(bursaryApplication.getApplicant().getCountryOfBirth());
            user.setEmploymentStatus(bursaryApplication.getApplicant().getEmploymentStatus());
            userService.update(user, correlationId, authentication);

            // Contact Details
            _bursaryApplication.setHaveCompletedQualification(bursaryApplication.getHaveCompletedQualification());
            _bursaryApplication.setStudyAddressSameAsResidentialAddress(bursaryApplication.getStudyAddressSameAsResidentialAddress());
            _bursaryApplication.setResidentialAddress(bursaryApplication.getResidentialAddress());
            _bursaryApplication.setPostalCode(bursaryApplication.getPostalCode());
            _bursaryApplication.setSuburb(bursaryApplication.getSuburb());
            _bursaryApplication.setMunicipality(bursaryApplication.getMunicipality());
            _bursaryApplication.setProvince(bursaryApplication.getProvince());
            _bursaryApplication.setAddressClassification(bursaryApplication.getAddressClassification());

            // Education
            _bursaryApplication.setRegisteredQualification(bursaryApplication.getRegisteredQualification());
            _bursaryApplication.setEnrolmentType(bursaryApplication.getEnrolmentType());
            _bursaryApplication.setCompletedQualification(bursaryApplication.getCompletedQualification());
            _bursaryApplication.setCurrentLevel(bursaryApplication.getCurrentLevel());
            _bursaryApplication.setStudentNumber(bursaryApplication.getStudentNumber());
            _bursaryApplication.setMatricYear(bursaryApplication.getMatricYear());
            _bursaryApplication.setHighSchoolName(bursaryApplication.getHighSchoolName());
            _bursaryApplication.setPreviousYearAverage(bursaryApplication.getPreviousYearAverage());
            _bursaryApplication.setCompleteOutstandingModule(bursaryApplication.getCompleteOutstandingModule());
            _bursaryApplication.setDebt(bursaryApplication.getDebt());
            _bursaryApplication.setLastYearFundingType(bursaryApplication.getLastYearFundingType());
            _bursaryApplication.setFundingSourceForPreviousYear(bursaryApplication.getFundingSourceForPreviousYear());
            _bursaryApplication.setResidence(bursaryApplication.getResidence());



            bursaryApplicationRepository.save(_bursaryApplication);
            bursaryApplicationRepository.flush();
            log.info("{} : Bursary application was successfully updated", correlationId);

            return ResponseEntity.ok().body(new ResponseResult(200, "Bursary application was updated successfully", _bursaryApplication));
        }catch (Exception e){
            log.error("{} : Error while updating bursary application", correlationId);
            return ResponseEntity.badRequest().body(new ResponseResult(400, e.getMessage(), null));
        }finally {
            log.info("{} : Done updating bursary application", correlationId);
        }
    }

    public ResponseEntity delete(long id, String correlationId, Authentication authentication) {
        try{
            log.info("cid=>{} start with delete bursary application function. Object => {}", correlationId, id);

            if (id == 0) {
                log.warn("{} : no content", correlationId);
                return ResponseEntity.noContent().build();
            }

            BursaryApplication _bursaryApplication = bursaryApplicationRepository.findById(id).orElseThrow(() -> new RuntimeException("Bursary application Not found"));

            User updater = userService.getUserByAuthJWT(authentication);
            _bursaryApplication.setDeleted(1);
            _bursaryApplication.setUserUpdated(updater);

            _bursaryApplication.setDeleted(1);

            BursaryApplication r = bursaryApplicationRepository.save(_bursaryApplication);

            historyService.record(new History("delete bursary application", "delete", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Bursary application successfully deleted", r));
        }catch (Exception e) {
            log.error("cid=>{} error on delete bursary application function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with delete bursary application function.", correlationId);
        }
    }
}
