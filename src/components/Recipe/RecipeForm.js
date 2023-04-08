import { FormInput } from "@/components/Form/FormInput"
import { FormTextarea } from "@/components/Form/FormTextarea"
import { Button, HStack, Icon, IconButton, VStack } from "@chakra-ui/react"
import { useFieldArray } from "react-hook-form"
import { FaPlus, FaTrash } from "react-icons/fa"

export const RecipeForm = () => {
  const { fields, append, remove } = useFieldArray({
    name: "food",
  })

  return (
    <VStack w="full" alignItems="flex-start" spacing="12">
      <FormInput
        name="name"
        label="Nom de recette"
        rules={{
          required: "Le nom de la recette est requis",
        }}
        w="full"
      />
      <VStack w="full" alignItems="flex-start">
        {fields?.map((field, index) => {
          return (
            <HStack w="full" key={field?.id} alignItems="flex-end">
              <FormInput name={`food.${index}.name`} label="Aliment" />
              <FormInput name={`food.${index}.quantity`} label="Quantité" />
              <FormInput name={`food.${index}.unity`} label="Unité" />
              <IconButton
                onClick={() => {
                  remove(index)
                }}
                icon={<Icon as={FaTrash} />}
              />
            </HStack>
          )
        })}
        <Button
          leftIcon={<Icon as={FaPlus} />}
          onClick={() => {
            append({ name: "", quantity: "", unity: "" })
          }}
        >
          Ajouter un aliment
        </Button>
      </VStack>
      <FormTextarea
        name="recipe"
        label="Recette"
        rules={{
          required: "La recette est requise",
        }}
        w="full"
      />
    </VStack>
  )
}
