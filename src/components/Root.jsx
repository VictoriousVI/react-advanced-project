import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { CategoriesUsersContext } from "./CategoriesUsersContext";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return { categories: await categories.json(), users: await users.json() };
};

export const Root = () => {
  const { categories, users } = useLoaderData();

  return (
    <Box>
      <Header />
      <CategoriesUsersContext.Provider value={{ categories, users }}>
        <Outlet />
      </CategoriesUsersContext.Provider>
    </Box>
  );
};
