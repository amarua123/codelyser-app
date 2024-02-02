package com.accolite.codelyzer.serviceimpl;

import com.accolite.codelyzer.model.Tag;
import com.accolite.codelyzer.repository.TagRepo;
import com.accolite.codelyzer.service.TagService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class TagServiceImpl implements TagService {
    @Autowired
    TagRepo tagRepo;

    @Override
    public Optional<Tag> findByTagName(String tagName) {
        return tagRepo.findByTagName(tagName);
    }
    @Override
    public Tag getOrCreateTag(String tagName) {
        Optional<Tag> existingTag = tagRepo.findByTagName(tagName);

        return existingTag.orElseGet(() -> {
            Tag newTag = new Tag();
            newTag.setTagName(tagName);
            return tagRepo.save(newTag);
        });
    }

    @Override
    public Tag save(Tag newTag) {
        return tagRepo.save(newTag);
    }
}
