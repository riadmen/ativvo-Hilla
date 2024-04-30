import React, {useEffect, useState} from "react";
import {SamplePersonService} from "Frontend/generated/endpoints";
import SamplePerson from "Frontend/generated/com/ativvo/data/entity/SamplePerson";
import Box from "@mui/material/Box";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbar,
    GridToolbarContainer,
    GridToolbarExport, GridToolbarFilterButton, GridColumnMenu, GridColumnMenuProps, GridActionsCellItem
} from '@mui/x-data-grid';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

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
    //const rows = samplePersons.slice(start, end)
    const [height, setHeight] = React.useState(400);

    const columns: GridColDef[] = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {


                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        color="inherit"
                        onClick={() => handleClickOpen(Number(id))}
                    />,
                ];
            },
        },
        {field: 'id', headerName: 'ID', width: 150},
        {field: 'firstName', headerName: 'First Name', width: 150},
        {field: 'lastName', headerName: 'Last Name', width: 150},
        {field: 'email', headerName: 'Email', width: 150},
        {field: 'phone', headerName: 'Phone', width: 150},
        {field: 'dateOfBirth', headerName: 'Date of Birth', width: 150},
        {field: 'occupation', headerName: 'Occupation', width: 150},
        {field: 'role', headerName: 'Role', width: 150},
        {field: 'important', headerName: 'Important', width: 150},

    ];

    const rows: GridRowsProp = samplePersons.map(person => ({
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        phone: person.phone,
        dateOfBirth: person.dateOfBirth,
        occupation: person.occupation,
        role: person.role,
        important: person.important,
    }));

    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState<number | null>(null);

    const handleClickOpen = (id: number) => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (deleteId !== null) {
            deletePerson(deleteId);
        }
        setOpen(false);
    };

    const deletePerson = (id: any) => {
        SamplePersonService.delete(id)
            .then(() => {
                // Handle successful deletion here
                SamplePersonService.list(pageable, undefined)
                    .then(data => {
                        setSamplePersons(data);
                    })
                    .catch(error => {
                        console.error('Error fetching SamplePerson instances:', error);
                    });
            })
            .catch((error: any) => {
                console.error('Error deleting SamplePerson instance:', error);
            });
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon/>}>
                    Add record
                </Button>
                <GridToolbarFilterButton/>
                <GridToolbarExport/>
            </GridToolbarContainer>
        );
    }

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this person?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper sx={{p: 0, display: 'flex', flexDirection: 'column', height: height}}>
                <DataGrid
                    initialState={{
                        density: 'compact',
                    }}
                    autoPageSize
                    disableColumnMenu
                    disableRowSelectionOnClick
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar: CustomToolbar
                    }}
                />
            </Paper>
        </Box>
    );
}
