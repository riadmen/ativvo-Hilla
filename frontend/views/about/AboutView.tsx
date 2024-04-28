import React, {useEffect, useState} from "react";
import {SamplePersonService} from "Frontend/generated/endpoints";
import SamplePerson from "Frontend/generated/com/ativvo/data/entity/SamplePerson";
import {DataTable, Table} from '@primer/react/experimental'

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

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        SamplePersonService.count(undefined)
            .then((result) => {
                setCount(result);
            })
            .catch((error) => {
                console.error('Error fetching count:', error);
            });
    }, []);

    const pageSize = 10
    const [pageIndex, setPageIndex] = React.useState(0)
    const start = pageIndex * pageSize
    const end = start + pageSize
    const rows = samplePersons.slice(start, end)

    return (
        <>
            {rows.length > 0 && (
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
                        data={rows}
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
                    <Table.Pagination
                        aria-label="Pagination for Repositories"
                        pageSize={pageSize}
                        totalCount={samplePersons.length}
                        onChange={({pageIndex}) => {
                            setPageIndex(pageIndex)
                        }}
                    />
                </Table.Container>
            )}
        </>
    );
}
