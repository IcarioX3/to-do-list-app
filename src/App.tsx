import '@mantine/core/styles.css';

import {
  Container,
  createTheme,
  MantineProvider,
  Stack,
  Title,
} from '@mantine/core';
import TaskInput from './components/TaskInput';
import type { Task } from './types/task';
import TaskList from './components/TaskList';
import { useListState } from '@mantine/hooks';

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  fontFamilyMonospace: 'Roboto, sans-serif',
  headings: { fontFamily: 'Roboto, sans-serif' },
});

export default function App() {
  const [tasks, tasksHandlers] = useListState<Task>([]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    tasksHandlers.append(newTask);
  };

  const toggleTask = (id: string) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      const updated = { ...tasks[index], completed: !tasks[index].completed };
      tasksHandlers.setItem(index, updated);
    }
  };

  const removeTask = (id: string) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasksHandlers.remove(index);
    }
  };

  const handleReorder = (from: number, to: number) => {
    tasksHandlers.reorder({ from, to });
  };

  return (
    <MantineProvider theme={theme}>
      <Container size="sm" py="xl">
        <Title ta="center" mb="xl">
          To-Do List 📝
        </Title>
        <Stack pt="md" justify="center">
          <TaskInput onAdd={addTask}></TaskInput>
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onRemove={removeTask}
            onReorder={handleReorder}
          ></TaskList>
        </Stack>
      </Container>
    </MantineProvider>
  );
}
