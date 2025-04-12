import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { BiSave } from "react-icons/bi";

const PublishSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
});

export default function PublishDoodleForm({ onPublish, url }) {
  const [error, setError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PublishSchema),
  });

  async function onSubmit(values) {
    try {
      await onPublish(values.title); // external handler for publishing
    } catch (err) {
      setError("Failed to publish doodle");
    }
  }

  return (
    <Container maxW="container.md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Input type="text" {...register("title")} />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <FormControl isInvalid={!!error}>
          <FormErrorMessage mt={6}>{error}</FormErrorMessage>
        </FormControl>
        <Image src={url} w={600} h={600} />
        <Button
          mt={8}
          leftIcon={<Icon boxSize={6} as={BiSave} />}
          colorScheme="green"
          isLoading={isSubmitting}
          type="submit"
        >
          Save
        </Button>
      </form>
    </Container>
  );
}
