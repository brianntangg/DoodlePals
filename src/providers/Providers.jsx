import AuthProvider from "./AuthProvider.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import DatabaseProvider from "./DatabaseProvider.jsx";

export default function Providers({ children }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <DatabaseProvider>{children}</DatabaseProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
