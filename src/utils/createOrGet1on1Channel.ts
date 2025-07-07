import { SendbirdChatSDK } from '@sendbird/uikit-react-native';

export async function createOrGet1on1Channel(userId: string, sdk: SendbirdChatSDK) {
  try {
    const params = new sdk.groupChannelParams();
    params.isDistinct = true; // Important for 1-on-1
    params.invitedUserIds = [userId];
    const channel = await sdk.groupChannel.createChannel(params);
    return channel;
  } catch (error) {
    console.error('Error creating/fetching 1-on-1 channel:', error);
    throw error;
  }
} 