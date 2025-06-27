import { TextInput, View, Text, TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  editable?: boolean;
};

export const Input = ({ label, error, editable = true, ...props }: InputProps) => {
  return (
    <View className="w-full mb-4">
      {label && <Text className="mb-1 text-base font-medium">{label}</Text>}

      <TextInput
        className={`border rounded-xl px-4 py-3 text-base ${
          editable 
            ? 'border-gray-300 bg-white' 
            : 'border-gray-200 bg-gray-100'
        }`}
        placeholderTextColor={editable ? "#999" : "#ccc"}
        editable={editable}
        {...props}
      />

      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  );
};
