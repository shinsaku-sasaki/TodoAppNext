import {
  VStack,
  Text,
  ListItem,
  UnorderedList,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import React from "react";
import { useAtom } from "jotai";
import { Todo, modalAtom } from "@/atoms/todoAtom";
import useSWRMutation from "swr/mutation";

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }: Props) => {
  const [_, setModalState] = useAtom(modalAtom);

  const updateTodo = async (
    url: string,
    { arg }: { arg: { id: number; text: string; completed: boolean } }
  ) => {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
    if (!res.ok) {
      throw new Error("An error occurred while updating a todo.");
    }
    return await res.json();
  };
  const { trigger: triggerOnUpdate } = useSWRMutation("/api/todos", updateTodo);

  const deleteTodo = async (url: string, { arg }: { arg: { id: number } }) => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
    if (!res.ok) {
      throw new Error("An error occurred while deleting a todo.");
    }
    return await res.json();
  };
  const { trigger: triggerOnDelete } = useSWRMutation("/api/todos", deleteTodo);

  const onToggleComplete = async (todo: Todo) => {
    try {
      await triggerOnUpdate(
        {
          id: todo.id,
          text: todo.text,
          completed: !todo.completed,
        },
        {
          optimisticData: [
            ...todos.map((t) =>
              t.id === todo.id ? { ...t, completed: !t.completed } : t
            ),
          ],
        }
      );
    } catch (e) {
      // エラーハンドリング
      console.error(e);
    }
  };
  const handleEdit = (todo: Todo) => {
    setModalState({ type: "edit", target: todo });
  };
  const handleDelete = async ({ id }: Todo) => {
    try {
      await triggerOnDelete(
        { id },
        {
          optimisticData: [...todos.filter((t) => t.id !== id)],
        }
      );
    } catch (e) {
      // エラーハンドリング
      console.error(e);
    }
  };

  return (
    <UnorderedList w={"full"}>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          role="listitem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          mb={2}
          borderRadius="md"
          bg="white"
          boxShadow="md"
        >
          <IconButton
            mr={2}
            icon={todo.completed ? <FaCheck /> : <></>}
            colorScheme={todo.completed ? "green" : "gray"}
            variant={"outline"}
            aria-label="Complete"
            size="sm"
            isRound
            onClick={() => onToggleComplete(todo)} // チェックボタンをクリックしたときに完了状態を切り替える
          />
          <VStack align="start" spacing={0} flex="1">
            <Text
              fontSize="lg"
              textDecoration={todo.completed ? "line-through" : "none"}
              color={todo.completed ? "gray.300" : "blackAlpha"}
            >
              {todo.text}
            </Text>
          </VStack>
          <Flex py={4} gap={2}>
            {todo.completed ? null : (
              <IconButton
                icon={<FaEdit />}
                colorScheme="blue"
                aria-label="Edit"
                size="sm"
                isRound
                onClick={() => handleEdit(todo)}
              />
            )}
            <IconButton
              icon={<FaTrash />}
              colorScheme="red"
              aria-label="Delete"
              size="sm"
              isRound
              onClick={() => handleDelete(todo)}
            />
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default TodoList;
