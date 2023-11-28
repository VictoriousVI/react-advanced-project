import {
  Button,
  Collapse,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { CategoriesUsersContext } from "./CategoriesUsersContext";

export const EventSearch = ({ changeFn, clickFn, filterArray }) => {
  const { categories } = useContext(CategoriesUsersContext);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex pt="80px" w={{ base: "100%", md: "704px" }} direction="column">
      <InputGroup>
        <InputLeftElement>
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input focusBorderColor="gray.400" onChange={changeFn} />
      </InputGroup>

      <Button mt="1rem" bg="gray.200" onClick={onToggle}>
        Filter by categories
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          pt="1rem"
          pb="1rem"
          justify="space-evenly"
          border="2px"
          borderColor="gray.200"
        >
          {categories.map((category) => (
            <Tag
              key={category.id}
              bg={filterArray.includes(category.id) ? "green.200" : "gray.200"}
              onClick={() => clickFn(category.id)}
            >
              {category.name}
            </Tag>
          ))}
        </Flex>
      </Collapse>
    </Flex>
  );
};
