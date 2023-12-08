import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const DeleteEvent = ({ removeEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();

  // handle for delete buttin within the alert
  const handleClick = () => {
    removeEvent();
    onClose();
  };

  return (
    <>
      <Button
        size={["xs", "sm", "md"]}
        rightIcon={<DeleteIcon />}
        onClick={onOpen}
        colorScheme="red"
        alignSelf="flex-end"
      >
        Delete Event
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Event</AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will permanently delete this event.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
