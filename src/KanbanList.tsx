import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Droppable, Draggable, DraggableProvided } from 'react-beautiful-dnd';

import { List } from './Kanban';
import { KanbanItem } from './KanbanItem';

export interface Item {
  id: string;
  content: string;
  completed: boolean;
}

export function KanbanList(props: {
  onAdd: (id: string, content: string) => void;
  onDelete: (itemId: string, listId: string) => void;
  handleChecked: (itemId: string) => void;
  list: List;
  items: Item[];
  index: number;
}) {
  const [term, setTerm] = useState('');

  const onAdd = (): void => {
    const value = term;
    console.log(value);
    props.onAdd(props.list.id, value);
  };

  const onDelete = (itemId: string): void => {
    props.onDelete(itemId, props.list.id);
  };
  const handleChecked = (itemId: string) => {
    props.handleChecked(itemId);
  };
  return (
    <Draggable draggableId={props.list.id} index={props.index}>
      {(provided: DraggableProvided) => (
        <Card
          variant="outlined"
          sx={{ bgcolor: 'grey.200', width: 400 }}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              {...provided.dragHandleProps}
            >
              {props.list.title}
            </Typography>

            <br></br>
            <Droppable droppableId={props.list.id} type="item">
              {(provided) => (
                <Stack
                  spacing={2}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {props.items.map((item: Item, index) => {
                    return (
                      <KanbanItem
                        key={item.id}
                        item={item}
                        index={index}
                        onDelete={onDelete}
                        handleChecked={handleChecked}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
            <br></br>
            <Stack spacing={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="New Item"
                onChange={(event) => setTerm(event.target.value)}
              />
              <Button size="small" onClick={onAdd}>
                Add Item
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}