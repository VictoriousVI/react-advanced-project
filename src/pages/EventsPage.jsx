import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { EventSearch } from "../components/EventSearch";
import { EventsList } from "../components/EventsList";
import { useLoaderData } from "react-router-dom";
import { CreateEvent } from "../components/CreateEvent";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");

  return { events: await events.json() };
};

export const EventsPage = () => {
  const { events } = useLoaderData();

  const [eventList, setEventList] = useState(events);
  const [searchField, setSearchField] = useState("");
  const [filterArray, setFilterArray] = useState([]);

  const clickFn = (categoryId) => {
    if (filterArray.includes(categoryId)) {
      setFilterArray(filterArray.filter((filter) => filter !== categoryId));
    } else {
      setFilterArray(filterArray.concat(categoryId));
    }
  };

  const handleChange = (event) => setSearchField(event.target.value);

  const filteredEvents = eventList.filter((event) => {
    if (filterArray.length === 0) {
      return true;
    }
    return filterArray.some((filter) => event.categoryIds.includes(filter));
  });

  const matchedEvents = filteredEvents.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const makeEvent = async (event) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    event.id = (await response.json()).id;
    setEventList(eventList.concat(event));
  };

  return (
    <Flex p="2rem" direction="column" alignItems="center" gap="2rem">
      <EventSearch
        changeFn={handleChange}
        clickFn={clickFn}
        filterArray={filterArray}
      />
      <EventsList events={matchedEvents} />
      <CreateEvent makeEvent={makeEvent} />
    </Flex>
  );
};
