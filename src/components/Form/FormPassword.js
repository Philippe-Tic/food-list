import { FormGroup } from "@/components/FormGroup"
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"

export const FormPassword = ({ label, name, rules }) => {
  const { formState } = useFormContext()
  const { errors, control } = formState
  const [isPassword, setIsPassword] = useState(true)

  return (
    <FormGroup
      errorMessage={errors?.[name]?.message}
      showError={errors?.[name]}
      label={label}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputGroup>
            <Input type={isPassword ? "password" : "text"} {...field} />
            <InputRightElement>
              <IconButton
                size="sm"
                onClick={() => {
                  setIsPassword(!isPassword)
                }}
                icon={<Icon as={isPassword ? FiEyeOff : FiEye} />}
              />
            </InputRightElement>
          </InputGroup>
        )}
      />
    </FormGroup>
  )
}
