import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSendbirdChat, GroupChannelFragment, useGroupChannel } from '@sendbird/uikit-react-native';
import { View, ActivityIndicator } from 'react-native';

const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const { sdk } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, params.channelUrl);

  if (!channel) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <GroupChannelFragment
      channel={channel}
      onChannelDeleted={() => navigation.goBack()}
      onPressHeaderLeft={() => navigation.goBack()}
    />
  );
};

export default GroupChannelScreen; 