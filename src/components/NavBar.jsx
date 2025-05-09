import { useAuth } from "../providers/AuthProvider.jsx";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BiMenu } from "react-icons/bi";

export default function NavBar() {
  const auth = useAuth();
  return (
    <header>
      <Box px={8} py={6} borderBottomWidth={2} borderBottomColor="gray.200">
        <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
          <ChakraLink as={ReactRouterLink} to="/">
            <Heading>DoodlePals</Heading>
          </ChakraLink>
          <Spacer />
          {auth.user ? <LoggedInControls /> : <LoggedOutControls />}
        </Flex>
        <Flex alignItems="center" display={{ base: "flex", md: "none" }}>
          <ChakraLink as={ReactRouterLink} to="/">
            <Heading>DoodlePals</Heading>
          </ChakraLink>
          <Spacer />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon boxSize={6} as={BiMenu} />}
            />
            <MenuList>
              {auth.user ? <LoggedInMenu /> : <LoggedOutMenu />}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </header>
  );
}

function LoggedOutControls() {
  return (
    <HStack spacing={8}>
      <ChakraLink as={ReactRouterLink} to="/login">
        Log in
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/signup">
        Sign up
      </ChakraLink>
    </HStack>
  );
}

function LoggedOutMenu() {
  return (
    <>
      <MenuLink path="/login">Log in</MenuLink>
      <MenuLink path="/signup">Sign up</MenuLink>
    </>
  );
}

function LoggedInControls() {
  return (
    <>
      <HStack spacing={8}>
        <NavLink path="/doodles">My Doodles</NavLink>
        <NavLink path="/community">Community Doodles</NavLink>
        <NavLink path="/new">Create Doodle</NavLink>
      </HStack>
      <Spacer />
      <ChakraLink as={ReactRouterLink} to="/logout">
        Log out
      </ChakraLink>
    </>
  );
}

function LoggedInMenu() {
  return (
    <>
      <MenuLink path="/doodles">My Doodles</MenuLink>
      <MenuLink path="/community">Community Doodles</MenuLink>
      <MenuLink path="/new">Create Doodle</MenuLink>
      <MenuDivider />
      <MenuLink path="/logout">Log out</MenuLink>
    </>
  );
}

function NavLink({ path, children }) {
  const location = useLocation();
  return (
    <ChakraLink
      as={ReactRouterLink}
      to={path}
      fontWeight={location.pathname === path ? "semibold" : undefined}
    >
      {children}
    </ChakraLink>
  );
}

function MenuLink({ path, children }) {
  const navigate = useNavigate();
  return <MenuItem onClick={() => navigate(path)}>{children}</MenuItem>;
}
