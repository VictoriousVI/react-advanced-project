import { Link as ReactRouterLink } from "react-router-dom";
import {
  AspectRatio,
  Card,
  CardBody,
  Heading,
  Image,
  LinkBox,
  Text,
  Flex,
  LinkOverlay,
} from "@chakra-ui/react";
import { TagList } from "./TagList";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const EventsList = ({ events }) => {
  return (
    <Flex w="100%" direction="row" gap="1rem" justify="center" wrap="wrap">
      {events.map((event) => (
        <LinkBox
          w={["100%", "48%", "31.5%", "23.7%", "18.9%", "15.7%"]}
          key={event.id}
        >
          <Card w="100%" boxShadow="2xl" overflow="hidden">
            <AspectRatio ratio={16 / 9}>
              <Image src={event.image} objectFit="cover" />
            </AspectRatio>
            <CardBody p="1rem">
              <Flex direction="column" gap="1rem">
                <Flex
                  justify="space-between"
                  alignItems="center"
                  bg="gray.200"
                  p="0.5rem"
                  borderRadius="0.5rem"
                >
                  <Text fontSize={["sm", "xs"]}>
                    {event.startTime.slice(0, 10)} <br />
                    {event.startTime.slice(11, 16)}
                  </Text>
                  <ArrowForwardIcon boxSize={4} />
                  <Text fontSize={["sm", "xs"]} align="right">
                    {event.endTime.slice(0, 10)} <br />{" "}
                    {event.endTime.slice(11, 16)}
                  </Text>
                </Flex>
                <Heading size={["lg", "lg", "md"]} noOfLines={1}>
                  <LinkOverlay as={ReactRouterLink} to={`event/${event.id}`}>
                    {event.title}
                  </LinkOverlay>
                </Heading>
                <Text noOfLines={1}>{`${event.description}`}</Text>
                <TagList categoryIds={event.categoryIds} />
              </Flex>
            </CardBody>
          </Card>
        </LinkBox>
      ))}
    </Flex>
  );
};
