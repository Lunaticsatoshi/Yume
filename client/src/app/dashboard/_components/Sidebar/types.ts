export type ItemPropsType = {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
  setActive: React.Dispatch<
    React.SetStateAction<{
      id: string;
    }>
  >;
};
