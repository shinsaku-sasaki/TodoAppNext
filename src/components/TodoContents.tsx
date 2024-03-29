import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import TodoList from "./TodoList";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { useAtom, useSetAtom } from "jotai";
import { Todo, modalAtom } from "@/atoms/todoAtom";
import { FaPlus } from "react-icons/fa";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

const TodoContents = () => {
  const [_, setModalState] = useAtom(modalAtom);
  const addTodo = () => {
    setModalState({ type: "add", target: null });
  };
  const { data, isLoading, error } = useSWR<Todo[]>("/api/todos", fetcher);
  return (
    <>
      <VStack pt={10} align="center" justify="center" minH="100vh">
        <Box p={4} maxW="600" w={"full"}>
          <Heading textAlign={"center"} as="h1" fontSize="3xl" mb={6}>
            My Sample ToDo List
          </Heading>
          <Center flexDirection={"column"}>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              size="sm"
              mb={8}
              onClick={addTodo}
            >
              New ToDo
            </Button>
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <Alert status="error">
                <AlertIcon />
                通信に失敗しました。時間をおいて再度お試しください。
              </Alert>
            ) : data ? (
              <TodoList todos={data} />
            ) : (
              <p>Todoがありません</p>
            )}
          </Center>
        </Box>
      </VStack>
      <AddModal />
      <EditModal />
    </>
  );
};
export default TodoContents;
