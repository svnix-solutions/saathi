import type { RouteMap } from '@/native/ui';
import { HelpScreen } from './screens/HelpScreen';
import { SupportChatScreen } from './screens/SupportChatScreen';

/**
 * Support feature — public API of this folder. Other features import only from here.
 * Routes: help, supportChat
 */
export const routes: RouteMap = {
  help: HelpScreen,
  supportChat: SupportChatScreen,
};

export { HelpScreen, SupportChatScreen };
