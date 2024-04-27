import React, {useEffect, useState} from "react";
import {AutoGrid} from "@hilla/react-crud";
import {SamplePersonService} from "Frontend/generated/endpoints";
import SamplePersonModel from "Frontend/generated/com/ativvo/data/entity/SamplePersonModel";
import SamplePerson from "Frontend/generated/com/ativvo/data/entity/SamplePerson";
import {DataTable, PageHeader, Table} from '@primer/react/experimental'

export default function AboutView() {

    const [samplePersons, setSamplePersons] = useState<SamplePerson[]>([]);

    const pageable = {
        pageNumber: 0,
        pageSize: 10000, // Set this to a large number to get all instances
        sort: {
            orders: [] // Add this line
        },
    };

    useEffect(() => {
        SamplePersonService.list(pageable, undefined)
            .then(data => {
                setSamplePersons(data);
            })
            .catch(error => {
                console.error('Error fetching SamplePerson instances:', error);
            });
    }, []);

    return (
        <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">

            <Table.Container>
                <Table.Title as="h2" id="repositories">
                    Sample Persons
                </Table.Title>
                <Table.Subtitle as="p" id="repositories-subtitle">
                    A subtitle could appear here to give extra context to the data.
                </Table.Subtitle>
                <DataTable
                    aria-labelledby="repositories"
                    aria-describedby="repositories-subtitle"
                    data={samplePersons}
                    columns={[
                        {
                            header: 'First Name',
                            field: 'firstName',
                        },
                        {
                            header: 'Last Name',
                            field: 'lastName',
                        },
                        {
                            header: 'Email',
                            field: 'email',
                        },
                        {
                            header: 'Phone',
                            field: 'phone',
                        },
                        {
                            header: 'Date of Birth',
                            field: 'dateOfBirth',
                        },
                        {
                            header: 'Occupation',
                            field: 'occupation',
                        },
                        {
                            header: 'Role',
                            field: 'role',
                        },
                        {
                            header: 'Important',
                            field: 'important',
                        },
                    ]}
                />
            </Table.Container>
        </div>
    );
}
