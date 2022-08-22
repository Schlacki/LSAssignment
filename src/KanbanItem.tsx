import {
    Card,
    CardContent,
    Stack,
    Checkbox,
    Typography,
    IconButton,
    InputBase,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {Item} from './KanbanList';

export function KanbanItem(props: {
    item: Item;
    index: number;
    onDelete: (itemId: string) => void;
    handleChecked: (itemId: string) => void;
    setItemContent: (title: string, itemId: string) => void;
}) {


    const [title, setTitle] = useState(props.item.content);

    // manages deleting the item
    const onDelete = (): void => {
        props.onDelete(props.item.id);
    };

    //manages updating the status of the item (completed/not completed)
    const handleChecked = (): void => {
        props.handleChecked(props.item.id);
    };

    // manages changing the content of the item
    const onItemContentChange = (event: { preventDefault: () => void }) => {
        // event.preventDefault();
        props.setItemContent(title, props.item.id);
    };

    // const addImage =()=>{
    //   if (props.item.imgSrc){
    //     return <img src={require(`${props.item.imgSrc}`)} alt="" width="150"/>
    //     // return "Hello"
    //   }
    //       }
    return (
        <Draggable draggableId={props.item.id} index={props.index}>
            {(provided) => (
                <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <CardContent>
                        <Stack
                            spacing={2}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Checkbox
                                onChange={handleChecked}
                                checked={props.item.completed}
                            />
                            <Typography variant="h5">
                                <form onSubmit={onItemContentChange}>
                                    <InputBase
                                        multiline
                                        onBlur={onItemContentChange}
                                        spellCheck="false"
                                        size="medium"
                                        color="primary"
                                        value={title}
                                        onChange={(event: {
                                            target: { value: React.SetStateAction<string> };
                                        }) => setTitle(event.target.value)}
                                        sx={{fontSize: 20, maxWidth: 150}}
                                    />
                                </form>
                            </Typography>
                            <IconButton aria-label="delete" onClick={onDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        </Stack>
                        {/*<div>*/}
                        {/*  {addImage()}*/}
                        {/*</div>*/}
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
}
