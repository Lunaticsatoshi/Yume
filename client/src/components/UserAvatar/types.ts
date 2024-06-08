export type Variant = 'xl' | 'lg' | 'lmd' | 'md' | 'sm';

export type AvatarProps = {
  imageUri: string;
  variant: Variant;
  className?: string;
  margins?: {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  };
};

export type AvatarSetProps = {
  avatarArray: Pick<AvatarProps, 'imageUri'>[];
  variant: Variant;
  className?: string;
};
