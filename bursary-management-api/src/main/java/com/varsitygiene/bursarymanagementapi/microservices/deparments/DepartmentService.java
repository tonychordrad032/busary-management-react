package com.varsitygiene.bursarymanagementapi.microservices.deparments;

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
public class DepartmentService {

    private DepartmentRepository departmentRepository;

    private HistoryService historyService;

    /**
     * Create new department
     * @param department
     * @param correlationId
    //* @param authentication
     * @return
     */
    public ResponseEntity save(Department department, String correlationId) {
        try{
            log.info("cid=>{} start with create department function. Object => {}", correlationId, department.toString());

            Department _department = departmentRepository.findByDepartmentName(department.getDepartmentName());

            if(_department != null) {
                log.warn(department.getDepartmentName() + " Already exists.");
                return ResponseEntity.status(409).body(new ResponseResult(409, department.getDepartmentName() + " Already exists", department));
            }

            /*AppUser a = appUserService.getUserByAuthJWT(authentication);
            if(a != null) {
                region.setSourceCompany(a.getSourceCompany());
                region.setUserCreated(a);
                region.setUserUpdated(a);
            }*/
            departmentRepository.save(department);


            return ResponseEntity.created(null).body(new ResponseResult(201, "Department successfully created", department));
        }catch (Exception e) {
            log.error("cid=>{} error on create department function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with create department function.", correlationId);
        }
    }

    /**
     *
     * @param pageable
     * @param searchText
     * @return
     * @throws Exception
     */
    public ResponseEntity<Page<Department>> listAllPageAble(Pageable pageable, String searchText) {
        try {
            //AppUser a = appUserService.getUserByHttpRequest(request);
            return ResponseEntity.ok().body(departmentRepository.findAllBySearch(pageable, searchText));
        }catch (Exception e) {
            log.error("cid=>{} error on create listAllPageAble function.", e);
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity update(Department department, String correlationId) {
        try{
            log.info("cid=>{} start with update department function. Object => {}", correlationId, department.toString());

            Department rr = departmentRepository.findByDepartmentName(department.getDepartmentName());

            if(rr != null && rr.getDepartmentId() != department.getDepartmentId()) {
                log.warn(department.getDepartmentName() + " Already exists.");
                return ResponseEntity.status(409).body(new ResponseResult(409, department.getDepartmentName() + " Already exists", department));
            }

            Department _department = departmentRepository.findById(department.getDepartmentId()).orElseThrow(() -> new RuntimeException("Department Not found"));

            //AppUser a = appUserService.getUserByAuthJWT(authentication);

            _department.setDepartmentName(department.getDepartmentName());
            _department.setFaculty(department.getFaculty());

            Department r = departmentRepository.save(_department);

            historyService.record(new History("update department", "update", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Department successfully updated", r));
        }catch (Exception e) {
            log.error("cid=>{} error on update department function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with update department function.", correlationId);
        }
    }


    public ResponseEntity delete(long id, String correlationId) {
        try{
            log.info("cid=>{} start with delete department function. Object => {}", correlationId, id);

            Department _department = departmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Department Not found"));

            //AppUser a = appUserService.getUserByAuthJWT(authentication);

            _department.setDeleted(1);

            Department r = departmentRepository.save(_department);

            historyService.record(new History("delete department", "delete", "", r.toString(), null));
            return ResponseEntity.created(null).body(new ResponseResult(201, "Department successfully deleted", r));
        }catch (Exception e) {
            log.error("cid=>{} error on delete department function.", correlationId, e);
            return ResponseEntity.badRequest().body(new ResponseResult(500,e.getMessage(), null));
        }finally {
            log.info("cid=>{} finish with delete department function.", correlationId);
        }
    }
}
