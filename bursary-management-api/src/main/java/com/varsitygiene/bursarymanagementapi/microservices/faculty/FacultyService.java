package com.varsitygiene.bursarymanagementapi.microservices.faculty;

import com.varsitygiene.bursarymanagementapi.microservices.history.History;
import com.varsitygiene.bursarymanagementapi.microservices.history.HistoryService;
import com.varsitygiene.bursarymanagementapi.utils.helpers.ResponseResult;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Log4j2
@Service
public class FacultyService {
    private FacultyRepository facultyRepository;
    private HistoryService historyService;

    /**
     * Create new faculty
     * @param faculty
     * @param correlationId
     //* @param authentication
     * @return
     */
    public ResponseEntity save(Faculty faculty, String correlationId) {
        try{
            log.info("cid=>{} start with create faculty function. Object => {}", correlationId, faculty.toString());

            Faculty _faculty = facultyRepository.findByFacultyName(faculty.getFacultyName());

            if(_faculty != null) {
                log.warn(faculty.getFacultyName() + " Already exists.");
                return ResponseEntity.status(409).body(new ResponseResult(409, faculty.getFacultyName() + " Already exists", faculty));
            }

            /*AppUser a = appUserService.getUserByAuthJWT(authentication);
            if(a != null) {
                region.setSourceCompany(a.getSourceCompany());
                region.setUserCreated(a);
                region.setUserUpdated(a);
            }*/
            Faculty f = facultyRepository.save(faculty);

            historyService.record(new History("new faculty", "save", "", f.getFacultyName(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Faculty successfully created", faculty));
        }catch (Exception e) {
            log.error("cid=>{} error on create faculty function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with create faculty function.", correlationId);
        }
    }

    public ResponseEntity update(Faculty faculty, String correlationId) {
        try{
            log.info("cid=>{} start with update faculty function. Object => {}", correlationId, faculty.toString());

            Faculty rr = facultyRepository.findByFacultyName(faculty.getFacultyName());

            if(rr != null && rr.getFacultyId() != faculty.getFacultyId()) {
                log.warn(faculty.getFacultyName() + " Already exists.");
                return ResponseEntity.status(409).body(new ResponseResult(409, faculty.getFacultyName() + " Already exists", faculty));
            }

            Faculty _faculty = facultyRepository.findById(faculty.getFacultyId()).orElseThrow(() -> new RuntimeException("Faculty Not found"));

            //AppUser a = appUserService.getUserByAuthJWT(authentication);

            _faculty.setFacultyName(faculty.getFacultyName());
            Faculty r = facultyRepository.save(_faculty);

            historyService.record(new History("update faculty", "update", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Faculty successfully updated", r));
        }catch (Exception e) {
            log.error("cid=>{} error on update faculty function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with update faculty function.", correlationId);
        }
    }


    public ResponseEntity delete(long id, String correlationId) {
        try{
            log.info("cid=>{} start with delete faculty function. Object => {}", correlationId, id);

            Faculty _faculty = facultyRepository.findById(id).orElseThrow(() -> new RuntimeException("Faculty Not found"));

            //AppUser a = appUserService.getUserByAuthJWT(authentication);

            _faculty.setDeleted(1);

            Faculty r = facultyRepository.save(_faculty);

            historyService.record(new History("delete faculty", "delete", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Faculty successfully deleted", r));
        }catch (Exception e) {
            log.error("cid=>{} error on delete faculty function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with delete faculty function.", correlationId);
        }
    }

    /**
     *
     * @param pageable
     * @param searchText
     * @return
     * @throws Exception
     */
    public ResponseEntity<Page<Faculty>> listAllPageAble(Pageable pageable, String searchText) {
        try {
            //AppUser a = appUserService.getUserByHttpRequest(request);
            return ResponseEntity.ok().body(facultyRepository.findAllBySearch(pageable, searchText));
        }catch (Exception e) {
            log.error("cid=>{} error on create listAllPageAble function.", e);
            return ResponseEntity.badRequest().build();
        }
    }

}
