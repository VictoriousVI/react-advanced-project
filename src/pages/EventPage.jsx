import React from "react";
import { AspectRatio, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { TagList } from "../components/TagList";
import { EditEvent } from "../components/EditEvent";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch(`http://localhost:3000/users`);

  return { event: await event.json(), users: await users.json() };
};

export const EventPage = () => {
  const { event, users } = useLoaderData();

  const creator = users.find((user) => {
    return user.id === event.createdBy;
  });

  return (
    <Flex direction="column" w={{ base: "100%", xl: "1280px" }} m="0 auto">
      <Flex justify="space-between" mt="80px" p="1rem 2rem 1rem 2rem">
        <Heading>{event.title}</Heading>

        <EditEvent />
      </Flex>

      <AspectRatio ratio={{ base: 16 / 9, lg: 18 / 5 }}>
        <Image src={event.image} objectFit="cover" />
      </AspectRatio>

      <Flex p="1rem 2rem 1rem 2rem" direction="column" gap="1rem">
        <Flex
          p="1rem"
          justify="space-between"
          alignItems="center"
          bg="gray.200"
        >
          <Text fontSize="sm">
            {event.startTime.slice(0, 10)} <br />
            {event.startTime.slice(11, 16)}
          </Text>

          <ArrowForwardIcon boxSize={6} />

          <Text fontSize="sm" align="right">
            {event.endTime.slice(0, 10)} <br /> {event.endTime.slice(11, 16)}
          </Text>
        </Flex>

        <Flex justify="space-between" alignItems="center">
          <Text>{`Created by: ${creator.name}.`}</Text>
          <Image
            src={creator.image}
            h={["4rem", "6rem", "8rem", "10rem"]}
            mr="1rem"
            borderRadius="50%"
          />
        </Flex>

        <Text>{`${event.description}.`}</Text>

        <TagList categoryIds={event.categoryIds} />
      </Flex>
    </Flex>
  );
};
