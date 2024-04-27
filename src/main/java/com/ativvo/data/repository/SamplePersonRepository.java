package com.ativvo.data.repository;

import com.ativvo.data.entity.SamplePerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;

public interface SamplePersonRepository
        extends
        JpaRepository<SamplePerson, Long>, JpaSpecificationExecutor<SamplePerson> {

    SamplePerson findByFirstName(@Param("firstName") String firstName);

}
