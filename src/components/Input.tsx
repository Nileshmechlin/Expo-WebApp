import { TextInput, View, Text, TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <View className="w-full mb-4">
      {label && <Text className="mb-1 text-base font-medium">{label}</Text>}

      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 text-base"
        placeholderTextColor="#999"
        {...props}
      />

      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  );
};
