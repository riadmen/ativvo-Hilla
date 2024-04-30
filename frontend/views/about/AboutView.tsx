import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport, GridToolbarFilterButton, GridColumnMenu, GridColumnMenuProps, GridActionsCellItem
} from '@mui/x-data-grid';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import {SamplePersonService} from "Frontend/generated/endpoints";
import SamplePerson from "Frontend/generated/com/ativvo/data/entity/SamplePerson";
import PageTitleWrapper from "Frontend/components/PageTitleWrapper";
import PageHeader from "Frontend/components/PageHeaderDocs";


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
                        onClick={() => handleEditOpen(Number(id))}
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
                <Button color="primary" startIcon={<AddIcon/>} onClick={handleAddOpen}>
                    Add record
                </Button>
                <GridToolbarFilterButton/>
                <GridToolbarExport/>
            </GridToolbarContainer>
        );
    }

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [newFirstName, setNewFirstName] = React.useState("");
    const [newLastName, setNewLastName] = React.useState("");
    const [newEmail, setNewEmail] = React.useState("");
    const [newPhone, setNewPhone] = React.useState("");
    const [newDateOfBirth, setNewDateOfBirth] = React.useState("");
    const [newOccupation, setNewOccupation] = React.useState("");
    const [newRole, setNewRole] = React.useState("");


    const handleAddOpen = () => {
        setOpenAddDialog(true);
    };

    const handleAddClose = () => {
        setOpenAddDialog(false);
    };

    const handleAdd = () => {
        const newPerson: SamplePerson = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            phone: newPhone,
            dateOfBirth: newDateOfBirth,
            occupation: newOccupation,
            role: newRole,
            important: false,
        } as SamplePerson;
        SamplePersonService.add(newPerson)
            .then(() => {
                // Handle successful addition here
                SamplePersonService.list(pageable, undefined)
                    .then(data => {
                        setSamplePersons(data);
                    })
                    .catch(error => {
                        console.error('Error fetching SamplePerson instances:', error);
                    });
            })
            .catch((error: any) => {
                console.error('Error adding SamplePerson instance:', error);
            });
        setOpenAddDialog(false);
    };

    // Add these state variables
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [editPerson, setEditPerson] = React.useState<SamplePerson | null>(null);

// Add this function to handle opening of the edit dialog
    const handleEditOpen = (id: number) => {
        console.log(`Editing person with id: ${id}`);
        const person = samplePersons.find(p => p.id === id);
        if (person) {
            setEditPerson(person);
            setOpenEditDialog(true);
        }
    };

// Add this function to handle closing of the edit dialog
    const handleEditClose = () => {
        setOpenEditDialog(false);
    };

// Add this function to handle the actual editing of the person
    const handleEdit = () => {
        if (editPerson !== null) {
            SamplePersonService.update(editPerson)
                .then(() => {
                    // Handle successful update here
                    SamplePersonService.list(pageable, undefined)
                        .then(data => {
                            setSamplePersons(data);
                        })
                        .catch(error => {
                            console.error('Error fetching SamplePerson instances:', error);
                        });
                })
                .catch((error: any) => {
                    console.error('Error updating SamplePerson instance:', error);
                });
            setOpenEditDialog(false);
        }
    };

    return (
        <>
            <PageTitleWrapper>
                <PageHeader heading="Product" subheading="Test"/>
            </PageTitleWrapper>


            <Box
                p={3}
            >
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

                <Dialog
                    open={openAddDialog}
                    onClose={handleAddClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add New Person</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={newFirstName}
                            onChange={e => setNewFirstName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={newLastName}
                            onChange={e => setNewLastName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={newEmail}
                            onChange={e => setNewEmail(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone"
                            type="tel"
                            fullWidth
                            value={newPhone}
                            onChange={e => setNewPhone(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            fullWidth
                            value={newDateOfBirth}
                            onChange={e => setNewDateOfBirth(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="occupation"
                            label="Occupation"
                            type="text"
                            fullWidth
                            value={newOccupation}
                            onChange={e => setNewOccupation(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="role"
                            label="Role"
                            type="text"
                            fullWidth
                            value={newRole}
                            onChange={e => setNewRole(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddClose}>Cancel</Button>
                        <Button onClick={handleAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openEditDialog}
                    onClose={handleEditClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Person</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={editPerson?.firstName}
                            onChange={e => setEditPerson({
                                ...editPerson,
                                firstName: e.target.value,
                                lastName: editPerson?.lastName || "",
                                email: editPerson?.email || "",
                                phone: editPerson?.phone || "",
                                dateOfBirth: editPerson?.dateOfBirth || "",
                                occupation: editPerson?.occupation || "",
                                role: editPerson?.role || "",
                                important: editPerson?.important || false,
                                id: editPerson?.id || 0,
                                version: editPerson?.version || 0
                            })}
                        />
                        <TextField
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={editPerson?.lastName}
                            onChange={e => setEditPerson({
                                ...editPerson,
                                firstName: editPerson?.firstName || "",
                                lastName: e.target.value,
                                email: editPerson?.email || "",
                                phone: editPerson?.phone || "",
                                dateOfBirth: editPerson?.dateOfBirth || "",
                                occupation: editPerson?.occupation || "",
                                role: editPerson?.role || "",
                                important: editPerson?.important || false,
                                id: editPerson?.id || 0,
                                version: editPerson?.version || 0
                            })}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={editPerson?.email}
                            onChange={e => setEditPerson({
                                ...editPerson,
                                firstName: editPerson?.firstName || "",
                                lastName: editPerson?.lastName || "",
                                email: e.target.value,
                                phone: editPerson?.phone || "",
                                dateOfBirth: editPerson?.dateOfBirth || "",
                                occupation: editPerson?.occupation || "",
                                role: editPerson?.role || "",
                                important: editPerson?.important || false,
                                id: editPerson?.id || 0,
                                version: editPerson?.version || 0
                            })}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone"
                            type="tel"
                            fullWidth
                            value={editPerson?.phone}
                            onChange={e => setEditPerson({
                                ...editPerson,
                                firstName: editPerson?.firstName || "",
                                lastName: editPerson?.lastName || "",
                                email: editPerson?.email || "",
                                phone: e.target.value,
                                dateOfBirth: editPerson?.dateOfBirth || "",
                                occupation: editPerson?.occupation || "",
                                role: editPerson?.role || "",
                                important: editPerson?.important || false,
                                id: editPerson?.id || 0,
                                version: editPerson?.version || 0
                            })}
                        />
                        <TextField
                            margin="dense"
                            id="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            fullWidth
                            value={editPerson?.dateOfBirth}
                            onChange={e => setEditPerson({
                                ...editPerson,
                                firstName: editPerson?.firstName || "",
                                lastName: editPerson?.lastName || "",
                                email: editPerson?.email || "",
                                phone: editPerson?.phone || "",
                                dateOfBirth: e.target.value,
                                occupation: editPerson?.occupation || "",
                                role: editPerson?.role || "",
                                important: editPerson?.important || false,
                                id: editPerson?.id || 0,
                                version: editPerson?.version || 0
                            })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="occupation"
                            label="Occupation"
                            type="text"
                            fullWidth
                            value={editPerson?.occupation}
                            onChange={e => setEditPerson({
                                ...editPerson,
                                firstName: editPerson?.firstName || "",
                                lastName: editPerson?.lastName || "",
                                email: editPerson?.email || "",
                                phone: editPerson?.phone || "",
                                dateOfBirth: editPerson?.dateOfBirth || "",
                                occupation: e.target.value,
                                role: editPerson?.role || "",
                                important: editPerson?.important || false,
                                id: editPerson?.id || 0,
                                version: editPerson?.version || 0
                            })}
                        />
                        <TextField
                            margin="dense"
                            id="role"
                            label="Role"
                            type="text"
                            fullWidth
                            value={editPerson?.role}
                            onChange={e => setEditPerson({
                                ...editPerson,
                                firstName: editPerson?.firstName || "",
                                lastName: editPerson?.lastName || "",
                                email: editPerson?.email || "",
                                phone: editPerson?.phone || "",
                                dateOfBirth: editPerson?.dateOfBirth || "",
                                occupation: editPerson?.occupation || "",
                                role: e.target.value,
                                important: editPerson?.important || false,
                                id: editPerson?.id || 0,
                                version: editPerson?.version || 0
                            })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button onClick={handleEdit}>Save</Button>
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
        </>
    );
}
