import { Text, TouchableOpacity } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
};

export const AuthLink = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className="mt-4">
      <Text className="text-blue-500 underline text-center">{text}</Text>
    </TouchableOpacity>
  );
};
