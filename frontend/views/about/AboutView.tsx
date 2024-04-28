import React, {useEffect, useState} from "react";
import {SamplePersonService} from "Frontend/generated/endpoints";
import SamplePerson from "Frontend/generated/com/ativvo/data/entity/SamplePerson";
import {DataTable, PageHeader, Table} from '@primer/react/experimental'
import {ActionList, ActionMenu, Box, Heading, IconButton} from "@primer/react";
import {
    BookIcon,
    DownloadIcon,
    KebabHorizontalIcon,
    PencilIcon,
    PlusIcon,
    CopyIcon,
    RepoIcon,
    TrashIcon,
    SearchIcon,
} from '@primer/octicons-react'

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

    const pageSize = 8
    const [pageIndex, setPageIndex] = React.useState(0)
    const start = pageIndex * pageSize
    const end = start + pageSize
    const rows = samplePersons.slice(start, end)

    return (
        <Box id={"repositories"}>
            {rows.length > 0 && (
                <Table.Container>
                    <Table.Title as="h2" id="repositories">
                        Persons
                    </Table.Title>
                    <Table.Subtitle as="p" id="repositories-subtitle">
                        A subtitle could appear here to give extra context to the data.
                    </Table.Subtitle>
                    <Table.Actions>
                        <IconButton aria-label="Book" icon={SearchIcon} variant="invisible"/>
                        <IconButton aria-label="Book" icon={BookIcon} variant="invisible"/>
                        <IconButton aria-label="Download" icon={DownloadIcon} variant="invisible"/>
                        <IconButton aria-label="Add row" icon={PlusIcon} variant="invisible"/>
                    </Table.Actions>
                    <DataTable
                        aria-labelledby="repositories"
                        aria-describedby="repositories-subtitle"
                        data={rows}
                        columns={[
                            {
                                id: 'actions',
                                header: 'Actions',
                                renderCell: (row) => {
                                    return (
                                        <ActionMenu>
                                            <ActionMenu.Anchor>
                                                <IconButton
                                                    aria-label={`Actions: ${row.firstName}`}
                                                    title={`Actions: ${row.firstName}`}
                                                    icon={KebabHorizontalIcon}
                                                    variant="invisible"
                                                />
                                            </ActionMenu.Anchor>
                                            <ActionMenu.Overlay>
                                                <ActionList>
                                                    <ActionList.Item>
                                                        <ActionList.LeadingVisual>
                                                            <CopyIcon />
                                                        </ActionList.LeadingVisual>
                                                        Copy row
                                                    </ActionList.Item>
                                                    <ActionList.Item>
                                                        <ActionList.LeadingVisual>
                                                            <PencilIcon />
                                                        </ActionList.LeadingVisual>
                                                        Edit row
                                                    </ActionList.Item>
                                                    <ActionList.Divider/>
                                                    <ActionList.Item variant="danger">
                                                        <ActionList.LeadingVisual>
                                                            <TrashIcon />
                                                        </ActionList.LeadingVisual>
                                                        row
                                                    </ActionList.Item>
                                                </ActionList>
                                            </ActionMenu.Overlay>
                                        </ActionMenu>
                                    )
                                },
                            },
                            {
                                header: 'First Name',
                                field: 'firstName',
                                sortBy: 'alphanumeric',
                            },
                            {
                                header: 'Last Name',
                                field: 'lastName',
                                sortBy: 'alphanumeric',
                            },
                            {
                                header: 'Email',
                                field: 'email',
                                sortBy: 'alphanumeric',
                            },
                            {
                                header: 'Phone',
                                field: 'phone',
                                sortBy: 'alphanumeric',
                            },
                            {
                                header: 'Date of Birth',
                                field: 'dateOfBirth',
                                sortBy: 'datetime',
                            },
                            {
                                header: 'Occupation',
                                field: 'occupation',
                                sortBy: 'alphanumeric',
                            },
                            {
                                header: 'Role',
                                field: 'role',
                                sortBy: 'alphanumeric',
                            },
                            {
                                header: 'Important',
                                field: 'important',
                                sortBy: 'alphanumeric',
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
        </Box>
    );
}
