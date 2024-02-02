package com.accolite.codelyzer.controller;
import com.accolite.codelyzer.model.User;
import com.accolite.codelyzer.model.Group;
import com.accolite.codelyzer.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GroupController {
    @Autowired
    private GroupService groupService;
    @GetMapping("/groups/getAllGroup")
    public List<Group> listGroups() {
        return groupService.getAllGroups();
    }

    @PostMapping("/groups/create/{groupName}")
    public ResponseEntity<String> createGroup(@PathVariable String groupName) {
        Group group = new Group();
        group.setGroupName(groupName);
        return groupService.createGroup(group) != null ?
                new ResponseEntity<>("Group created successfully", HttpStatus.CREATED):
                ResponseEntity.internalServerError().build();
    }

    @GetMapping("/groupsUsers/{groupName}")
    public ResponseEntity<Set<User>> getAllUsersByGroupName(@PathVariable String groupName) {
        Set<User> users = groupService.getAllUsersByGroupName(groupName);
        if (users != null)
        {
            return ResponseEntity.ok(users);
        }
        else {

            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/addUser/{groupName}/{userEmail}")
    public ResponseEntity<String> addUser(@PathVariable String groupName, @PathVariable String userEmail) {
//        System.out.println(groupName + userEmail);
        try {
            groupService.addUser(groupName, userEmail);
            return ResponseEntity.ok("User added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add user to the group");
        }
    }

//    @PostMapping("/groups/removeUser")
//    public String removeUser() {
//        return "user removed";
//    }

}
