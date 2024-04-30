package com.ativvo.data.service;

import com.ativvo.data.repository.SamplePersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.ListRepositoryService;
import com.ativvo.data.entity.SamplePerson;

@BrowserCallable
@AnonymousAllowed
public class SamplePersonService extends ListRepositoryService<SamplePerson, Long, SamplePersonRepository> {

    public void delete(Long id) {
        getRepository().deleteById(id);
    }

    public SamplePerson add(SamplePerson person) {
        return getRepository().save(person);
    }

    public SamplePerson update(SamplePerson person) {
        if (getRepository().existsById(person.getId())) {
            return getRepository().save(person);
        } else {
            throw new IllegalArgumentException("Person must have an id to be updated");
        }
    }
}
