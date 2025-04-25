import type { Task } from '@/types/task';
import { ActionIcon, Checkbox, Group, Paper, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

type TaskListProps = {
  tasks: Task[];
  onToggle: (title: string) => void;
  onRemove: (title: string) => void;
  onReorder: (from: number, to: number) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onRemove,
  onReorder,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Text c="dimmed" ta="center" p="lg">
        No task to do. Write a task and click on 'Add' button to add one.
      </Text>
    );
  }

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        if (!destination) return;
        onReorder(source.index, destination.index);
      }}
    >
      <Droppable droppableId="task-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.5 : 1,
                    }}
                  >
                    <Paper key={task.id} shadow="md" p="lg" withBorder>
                      <Group justify="space-between" style={{ flex: 1 }}>
                        <Checkbox
                          label={
                            <Text
                              style={{
                                textDecoration: task.completed
                                  ? 'line-through'
                                  : 'none',
                                color: task.completed ? 'gray' : 'black',
                              }}
                            >
                              {task.title}
                            </Text>
                          }
                          checked={task.completed}
                          color="orange"
                          onChange={() => onToggle(task.id)}
                        />
                        <ActionIcon
                          color="orange"
                          onClick={() => onRemove(task.id)}
                        >
                          <IconTrash></IconTrash>
                        </ActionIcon>
                      </Group>
                    </Paper>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    // <Stack gap="xs">
    //   {tasks.map((task) => (
    //     <Paper key={task.title} shadow="md" p="lg" withBorder>
    //       <Group justify="space-between" style={{ flex: 1 }}>
    //         <Checkbox
    //           label={
    //             <Text
    //               style={{
    //                 textDecoration: task.completed ? 'line-through' : 'none',
    //                 color: task.completed ? 'gray' : 'black',
    //               }}
    //             >
    //               {task.title}
    //             </Text>
    //           }
    //           checked={task.completed}
    //           color="orange"
    //           onChange={() => onToggle(task.title)}
    //         />
    //         <ActionIcon color="orange" onClick={() => onRemove(task.title)}>
    //           <IconTrash></IconTrash>
    //         </ActionIcon>
    //       </Group>
    //     </Paper>
    //   ))}
    // </Stack>
  );
}
