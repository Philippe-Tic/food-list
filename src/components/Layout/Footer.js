import {
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

export const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    bg={useColorModeValue("gray.100", "gray.900")}
    py={{ base: "8", md: "12" }}
    px={{ base: 2, sm: 4, md: 8 }}
  >
    <Stack spacing={{ base: "4", md: "5" }}>
      <Stack justify="space-between" direction="row" align="center">
        <Text fontSize="lg" fontWeight="bold">
          FoodList
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} FoodList
      </Text>
    </Stack>
  </Box>
)
