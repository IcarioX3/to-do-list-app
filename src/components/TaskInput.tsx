import { Button, Group, TextInput } from '@mantine/core';
import { useState } from 'react';

type TaskInputProps = {
  onAdd: (title: string) => void;
};

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (value.trim() === '') return;

    onAdd(value.trim());
    setValue('');
  };

  return (
    <Group justify="center">
      <TextInput
        placeholder="New task"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Button onClick={handleAdd} color="orange">
        Add
      </Button>
    </Group>
  );
}
