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
  Textarea,
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

  // since chakraUI checkboxes dont take Number values I had to assign them strings. This converts them back to numbers.
  const handleCheckboxChange = (selectedValues) => {
    setCategoryIds(selectedValues.map(Number));
  };

  //handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    //makeEvent function from EventsPage sends form data to server and updates the eventslist
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

    // Reset form fields.
    setCreatedBy("");
    setTitle("");
    setDescription("");
    setImage("");
    setCategoryIds([]);
    setLocation("");
    setStartTime("");
    setEndTime("");

    // Close modal.
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<AddIcon />}
        colorScheme="green"
        position="fixed"
        bottom="1rem"
        right="2rem"
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
                <Textarea onChange={(e) => setDescription(e.target.value)} />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Image</FormLabel>
                <Input onChange={(e) => setImage(e.target.value)} />
              </FormControl>

              <FormControl mb="1rem">
                <FormLabel>Categories</FormLabel>
                <CheckboxGroup onChange={handleCheckboxChange}>
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
                <Input
                  type="datetime-local"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>End time</FormLabel>
                <Input
                  type="datetime-local"
                  onChange={(e) => setEndTime(e.target.value)}
                />
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
