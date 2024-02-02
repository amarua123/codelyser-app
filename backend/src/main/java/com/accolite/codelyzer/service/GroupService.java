package com.accolite.codelyzer.service;

import com.accolite.codelyzer.model.Group;
import com.accolite.codelyzer.model.User;

import java.util.List;
import java.util.Set;

public interface GroupService {
    List<Group> getAllGroups();
    Group createGroup(Group group);
    void removeUser(String groupName, String userEmail);
    Set<User> getAllUsersByGroupName(String groupName);
    void addUser(String groupName, String userEmail);
}
