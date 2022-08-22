import { useFormik } from 'formik';
import React from 'react';
import {Button, Stack, TextField} from "@mui/material";

interface Props {
    onAddItem:(content)=>void
}

const KanbanForm = (props:Props) => {

    const formik = useFormik({
        initialValues: { content: '', file: "" },
        onSubmit: (values) => {
            console.log(values.file)
            props.onAddItem(values.content);
            formik.resetForm();
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        required
                        variant="filled"
                        id="content"
                        name="content"
                        label="New Item"
                        onChange={formik.handleChange}
                        value={formik.values.content}
                    />
                    {/*<div>*/}
                    {/*<input type="file" id="file" name="file" onChange={formik.handleChange} value={formik.values.file}/>*/}
                    {/*</div>*/}
                        <Button type="submit">Add Item</Button>
                </Stack>
                </form>
        </div>
    );
};

export default KanbanForm;