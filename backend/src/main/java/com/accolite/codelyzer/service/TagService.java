package com.accolite.codelyzer.service;

import com.accolite.codelyzer.model.Tag;

import java.util.Optional;

public interface TagService {
    public Optional<Tag> findByTagName(String tagName);

    public Tag getOrCreateTag(String tagName);

    Tag save(Tag newTag);
}
