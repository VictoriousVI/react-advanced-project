import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CategoriesUsersContext } from "./CategoriesUsersContext";

export const CreateEvent = ({ makeEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { categories, users } = useContext(CategoriesUsersContext);

  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  //Form submit handle.
  const handleSubmit = (event) => {
    event.preventDefault();

    makeEvent({
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    });

    setCreatedBy("");
    setTitle("");
    setDescription("");
    setImage("");
    setCategoryIds([]);
    setLocation("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<AddIcon />}
        colorScheme="green"
        position="fixed"
        bottom="1rem"
        right="1rem"
      >
        Create Event
      </Button>

      <Modal
        isOpen={isOpen}
        size={["full", "md", "lg", "xl"]}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Event</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mb="1rem">
                <FormLabel>Created by</FormLabel>
                <Select
                  placeholder="Select creator"
                  onChange={(e) => setCreatedBy(Number(e.target.value))}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Title</FormLabel>
                <Input onChange={(e) => setTitle(e.target.value)} />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Description</FormLabel>
                <Input onChange={(e) => setDescription(e.target.value)} />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Image</FormLabel>
                <Input onChange={(e) => setImage(e.target.value)} />
              </FormControl>

              <FormControl mb="1rem">
                <FormLabel>Categories</FormLabel>
                <CheckboxGroup onChange={(e) => setCategoryIds(e.target.value)}>
                  <Flex justifyContent="space-around">
                    {categories.map((category) => (
                      <Checkbox
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </Checkbox>
                    ))}
                  </Flex>
                </CheckboxGroup>
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Location</FormLabel>
                <Input onChange={(e) => setLocation(e.target.value)} />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Start time</FormLabel>
                <Input onChange={(e) => setStartTime(e.target.value)} />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>End time</FormLabel>
                <Input onChange={(e) => setEndTime(e.target.value)} />
              </FormControl>

              <Button mb="1rem" type="submit">
                Create event
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
