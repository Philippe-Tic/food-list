import { FormGroup } from "@/components/FormGroup"
import { Input } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"

export const FormInput = ({ helper, label, name, rules }) => {
  const { formState } = useFormContext()
  const { errors, control } = formState

  return (
    <FormGroup
      errorMessage={errors?.[name]?.message}
      showError={errors?.[name]}
      label={label}
      helper={helper}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <Input {...field} />}
      />
    </FormGroup>
  )
}
