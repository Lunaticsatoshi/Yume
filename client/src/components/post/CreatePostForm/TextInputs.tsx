import React from "react";
import { Stack, Input, Textarea, Flex, Button } from "@chakra-ui/react";
import { TextInputField } from "../../ui/form/InputField";
import TextAreaField from "../../ui/form/TextAreaField";
import { ActionButton } from "../../ui/Button";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <TextInputField
        name="title"
        className="h-10"
        value={textInputs.title}
        onChange={onChange}
        placeholder="Title"
      />
      <TextAreaField
        name="body"
        className="h-24"
        placeholder="Type your post..."
        value={textInputs.body}
        onChange={onChange}
      />
      <Flex justify="flex-end">
        <ActionButton
          disabled={!textInputs.title}
          loading={loading}
          onClick={handleCreatePost}
        >
          Post
        </ActionButton>
      </Flex>
    </div>
  );
};
export default TextInputs;
