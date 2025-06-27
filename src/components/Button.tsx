import { Text, TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export const Button = ({ title, onPress, loading, disabled, style }: ButtonProps) => {
  const isDisabled = loading || disabled;
  
  const handlePress = async () => {
    if (!isDisabled) {
      await onPress();
    }
  };
  
  return (
    <TouchableOpacity
      className={`py-3 rounded-xl w-full items-center ${
        isDisabled ? 'bg-gray-400' : 'bg-black'
      }`}
      onPress={handlePress}
      disabled={isDisabled}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className={`text-base font-semibold ${
          isDisabled ? 'text-gray-600' : 'text-white'
        }`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
