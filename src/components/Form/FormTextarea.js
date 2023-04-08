import { FormGroup } from "@/components/FormGroup"
import { Textarea } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"

export const FormTextarea = ({ helper, label, name, rules }) => {
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
        render={({ field }) => <Textarea {...field} />}
      />
    </FormGroup>
  )
}
