import { Text, TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
};

export const Button = ({ title, onPress, loading, style }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-black py-3 rounded-xl w-full items-center"
      onPress={onPress}
      disabled={loading}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-base font-semibold">{title}</Text>
      )}
    </TouchableOpacity>
  );
};
