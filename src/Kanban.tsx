import React from 'react';
import axios from 'axios';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Item, KanbanList } from './KanbanList';
import { Box, Stack } from '@mui/material';

export interface List {
  id: string;
  title: string;
  itemIds: string[];
}
interface Data {
  id?: number;
  items: { id: string; content: string }[];
  lists: {};
  listOrder: string[];
}
export class Kanban extends React.Component {
  state: Data = { items: [], lists: {}, listOrder: [] };
  componentDidMount(): void {
    this.fetch();
  }

  onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === 'list') {
      const newListOrder: string[] = Array.from(this.state.listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const newState: Data = {
        ...this.state,
        listOrder: newListOrder,
      };
      this.setState(newState);
      this.save(newState);
      return;
    }

    const start: List = this.state.lists[source.droppableId];
    const finish: List = this.state.lists[destination.droppableId];
    if (start === finish) {
      const newItemIds: string[] = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newList: List = { ...start, itemIds: newItemIds };

      const newState: Data = {
        ...this.state,
        lists: { ...this.state.lists, [newList.id]: newList },
      };

      this.setState(newState);
      this.save(newState);
      return;
    }
    const startItemIds: string[] = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart: List = { ...start, itemIds: startItemIds };

    const finishItemIds: string[] = Array.from(finish.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newFinish: List = { ...finish, itemIds: finishItemIds };

    const newState: Data = {
      ...this.state,
      lists: {
        ...this.state.lists,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
    this.save(newState);
  };

  fetch = async () => {
    const response = await axios.get('http://localhost:3004/data/');
    console.log(response.data[0]);
    this.setState(response.data[0]);
  };

  save = (Data: Data) => {
    return axios.put('http://localhost:3004/data/1', Data);
  };

  addItem = (id: string, content: string): void => {
    const Id = content + this.state.items.length.toString();
    const newItem = {
      id: Id,
      content: content,
    };
    const newItems = [...this.state.items, newItem];

    const List: List = this.state.lists[id];
    const Items = List.itemIds;
    Items.push(Id);
    const newLists = { ...this.state.lists };
    const newState = { ...this.state, lists: newLists, items: newItems };
    this.setState(newState);
    this.save(newState);
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <Box
              sx={{ paddingBottom: 4 }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Stack spacing={2} margin={5} direction="row">
                {this.state.listOrder.map((listId, index) => {
                  const list: List = this.state.lists[listId];
                  const items: Item[] = list.itemIds.map(
                    // (itemId: string) => this.state.items[parseInt(itemId)]
                    (itemId: string) =>
                      this.state.items[
                        this.state.items.findIndex((item) => item.id === itemId)
                      ]
                  );

                  return (
                    <KanbanList
                      key={list.id}
                      list={list}
                      items={items}
                      index={index}
                      onAdd={this.addItem}
                    />
                  );
                })}
              </Stack>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Kanban;
