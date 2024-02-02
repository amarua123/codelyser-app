package com.accolite.codelyzer.serviceimpl;

import com.accolite.codelyzer.model.Group;
import com.accolite.codelyzer.model.User;
import com.accolite.codelyzer.repository.GroupRepo;
import com.accolite.codelyzer.repository.UserRepo;
import com.accolite.codelyzer.service.GroupService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private UserRepo userRepo;
    @Override
    public List<Group> getAllGroups() {
        return groupRepo.findAll();
    }

    @Override
    public Group createGroup(Group group) {
        return groupRepo.save(group);
    }


    public void addUser(String groupName, String userEmail) {

        Group group = groupRepo.findByGroupName(groupName);
        User user = userRepo.findByEmail(userEmail);

        if (group != null && user != null) {
            group.getUsers().add(user);
            user.getGroups().add(group);
            groupRepo.save(group);
        }
    }

    public Set<User> getAllUsersByGroupName(String groupName) {
        Group group = groupRepo.findByGroupName(groupName);
        if (group != null) {
            return group.getUsers();
        }
        else {
            return null; // Or handle the case when the group is not found
        }
    }

    @Override
    public void removeUser(String groupName, String userEmail) {

    }
}
