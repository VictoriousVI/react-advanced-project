import React, { useState } from "react";
import {
  AspectRatio,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { TagList } from "../components/TagList";
import { EditEvent } from "../components/EditEvent";
import { DeleteEvent } from "../components/DeleteEvent";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch(`http://localhost:3000/users`);

  return { event: await event.json(), users: await users.json() };
};

export const EventPage = () => {
  const { event, users } = useLoaderData();

  const [currentEvent, setCurrentEvent] = useState(event);

  const navigate = useNavigate();

  const toast = useToast();

  const creator = users.find((user) => {
    return user.id === currentEvent.createdBy;
  });

  const updateEvent = async (updatedEventData) => {
    const response = await fetch(
      `http://localhost:3000/events/${currentEvent.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedEventData),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );

    if (!response.ok) {
      toast({
        title: "Update failed.",
        description: "Failed to update the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw new Error("failed to update the event");
    }

    toast({
      title: "Update successful.",
      description: "Event was successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    const updatedEvent = await response.json();

    setCurrentEvent(updatedEvent);
  };

  const removeEvent = async () => {
    const response = await fetch(
      `http://localhost:3000/events/${currentEvent.id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("failed to delete the event");
    }
    navigate("/");
  };

  return (
    <Flex direction="column" w={{ base: "100%", xl: "1280px" }} m="0 auto">
      <Flex
        justify="space-between"
        mt="80px"
        p="1rem 2rem 1rem 2rem"
        alignItems="center"
      >
        <Heading size="lg">{currentEvent.title}</Heading>

        <EditEvent event={currentEvent} updateEvent={updateEvent} />
      </Flex>

      <AspectRatio ratio={{ base: 16 / 9, lg: 18 / 5 }}>
        <Image src={currentEvent.image} objectFit="cover" />
      </AspectRatio>

      <Flex
        p="1rem 2rem 1rem 2rem"
        wrap="wrap"
        gap="1rem"
        justify="space-between"
      >
        <Flex
          w="100%"
          p="1rem"
          justify="space-between"
          alignItems="center"
          bg="gray.200"
          borderRadius="1rem"
          order="1"
        >
          <Text fontSize="sm">
            {currentEvent.startTime.slice(0, 10)} <br />
            {currentEvent.startTime.slice(11, 16)}
          </Text>

          <ArrowForwardIcon boxSize={6} />

          <Text fontSize="sm" align="right">
            {currentEvent.endTime.slice(0, 10)} <br />{" "}
            {currentEvent.endTime.slice(11, 16)}
          </Text>
        </Flex>

        <Flex
          direction={["row", "column"]}
          justify="space-between"
          alignItems="center"
          w={["100%", "6rem", "8rem", "10rem"]}
          order={["2", "3"]}
        >
          <Text as="b">Created by:</Text>
          <Text mb={["0", "1rem"]}>{`${creator.name}.`}</Text>
          <Image
            src={creator.image}
            h={["4rem", "6rem", "8rem", "10rem"]}
            borderRadius="50%"
          />
        </Flex>

        <Flex w={["100%", "70%"]} order={["3", "2"]} direction="column">
          <Text as="b">Description:</Text>
          <Text>{`${currentEvent.description}.`}</Text>
        </Flex>

        <Flex w="100%" order="4" direction="column">
          <Text as="b" mb="1rem">
            Categories:
          </Text>
          <Flex justify="space-between" gap="1rem">
            <TagList categoryIds={currentEvent.categoryIds} />
            <DeleteEvent removeEvent={removeEvent} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
