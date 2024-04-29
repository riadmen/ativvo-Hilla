import React, {useEffect, useState} from "react";
import {SamplePersonService} from "Frontend/generated/endpoints";
import SamplePerson from "Frontend/generated/com/ativvo/data/entity/SamplePerson";
import Box from "@mui/material/Box";

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

        </Box>
    );
}
