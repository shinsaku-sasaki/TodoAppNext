import { Todo, initialModalAtomValue, modalAtom } from "@/atoms/todoAtom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

type FormData = {
  text: string;
};

const EditModal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [modalState, setModalState] = useAtom(modalAtom);
  const onClose = () => {
    setModalState(initialModalAtomValue);
    reset();
  };

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
  const { trigger, isMutating } = useSWRMutation("/api/todos", updateTodo);

  const onSubmit: SubmitHandler<FormData> = async ({ text }) => {
    if (!modalState.target) {
      return;
    }
    const id = modalState.target.id;
    const completed = modalState.target.completed;
    try {
      await trigger({ id, text, completed });
      onClose();
    } catch (e) {
      // エラーハンドリング
      console.error(e);
    }
  };

  return (
    <>
      <Modal isOpen={modalState.type === "edit"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit ToDo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.text}>
                <FormLabel>内容</FormLabel>
                <Input
                  placeholder="新しいToDo"
                  defaultValue={modalState.target?.text}
                  {...register("text", {
                    required: "内容は必須です。",
                    maxLength: {
                      value: 20,
                      message: "20文字までです",
                    },
                  })}
                />
                <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
              </FormControl>
              <Center mt={4} width={"full"}>
                <Button
                  isLoading={isMutating}
                  type="submit"
                  mx={"auto"}
                  w={200}
                  colorScheme="blue"
                >
                  更新する
                </Button>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
