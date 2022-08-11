import {
  Card,
  CardContent,
  Stack,
  Checkbox,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Item } from './KanbanList';

export function KanbanItem(props: { item: Item; index: number }) {
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
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
              <Checkbox />
              <Typography variant="h5">{props.item.content}</Typography>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
