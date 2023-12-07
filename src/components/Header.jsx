import { Flex, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Flex
      h="80px"
      w="100%"
      p="1rem 2rem 1rem 2rem"
      direction="row"
      justifyContent="space-between"
      align="center"
      position="fixed"
      zIndex="3"
      bg="gray.200"
      boxShadow="sm"
    >
      <LinkBox>
        <Heading size={{ base: "xl" }}>
          <LinkOverlay as={Link} to="/">
            events4u
          </LinkOverlay>
        </Heading>
      </LinkBox>
    </Flex>
  );
};
