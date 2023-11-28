import { Flex, Tag } from "@chakra-ui/react";
import { useContext } from "react";
import { CategoriesUsersContext } from "./CategoriesUsersContext";

export const TagList = ({ categoryIds }) => {
  const { categories } = useContext(CategoriesUsersContext);

  // Getting the names of the categories belonning to the category id's.
  const appliedCategories = categories.filter((category) => {
    return categoryIds.includes(category.id);
  });

  return (
    <Flex gap="1rem">
      {appliedCategories.map((category) => (
        <Tag key={category.id} bg="gray.200">
          {category.name}
        </Tag>
      ))}
    </Flex>
  );
};
