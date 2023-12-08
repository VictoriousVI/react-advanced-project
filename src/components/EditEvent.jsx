import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CategoriesUsersContext } from "./CategoriesUsersContext";

export const EditEvent = ({ event, updateEvent }) => {
  const { categories, users } = useContext(CategoriesUsersContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createdBy, setCreatedBy] = useState(event.createdBy);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [categoryIds, setCategoryIds] = useState(event.categoryIds);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime.slice(0, 16));
  const [endTime, setEndTime] = useState(event.endTime.slice(0, 16));

  // since chakraUI checkboxes dont take Number values I had to assign them strings. This converts them back to numbers.
  const handleCheckboxChange = (selectedValues) => {
    setCategoryIds(selectedValues.map(Number));
  };

  //handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    //updateEvent function from EventPage sends PATCH request to server, shows message on success and updates the page
    updateEvent({
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    });

    //close modal
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<EditIcon />}
        colorScheme="green"
        size={["xs", "sm", "md"]}
      >
        Edit
      </Button>

      <Modal
        isOpen={isOpen}
        size={["full", "md", "lg", "xl"]}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mb="1rem">
                <FormLabel>Created by</FormLabel>
                <Select
                  value={createdBy}
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
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Description</FormLabel>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Image</FormLabel>
                <Input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormControl>

              <FormControl mb="1rem">
                <FormLabel>Categories</FormLabel>
                <CheckboxGroup
                  defaultValue={categoryIds.map(String)}
                  onChange={handleCheckboxChange}
                >
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
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>Start time</FormLabel>
                <Input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb="1rem">
                <FormLabel>End time</FormLabel>
                <Input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </FormControl>

              <Button mb="1rem" type="submit">
                Edit event
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
