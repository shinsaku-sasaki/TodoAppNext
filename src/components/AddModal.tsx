import { initialModalAtomValue, modalAtom } from "@/atoms/todoAtom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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

const AddModal = () => {
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
  const addTodo = async (url: string, { arg }: { arg: { text: string } }) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
    if (!res.ok) {
      throw new Error("An error occurred while adding a todo.");
    }
    return await res.json();
  };
  const { trigger, isMutating } = useSWRMutation("/api/todos", addTodo);

  const onSubmit: SubmitHandler<FormData> = async ({ text }) => {
    try {
      await trigger({ text });
      onClose();
    } catch (e) {
      // エラーハンドリング
      console.error(e);
    }
  };

  return (
    <>
      <Modal isOpen={modalState.type === "add"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create ToDo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.text}>
                <FormLabel>内容</FormLabel>
                <Input
                  placeholder="新しいToDo"
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
                  作成する
                </Button>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddModal;
