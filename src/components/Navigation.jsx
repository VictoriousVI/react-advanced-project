import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex direction="row" bg="blue.100">
      <Box w="20px" h="20px" bg="blue.300" />
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <li>
          <Link to="/event/1">Event</Link>
        </li>
      </ul>
    </Flex>
  );
};
