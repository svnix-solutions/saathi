import type { RouteMap } from '@/native/nav';
import { DemandMapScreen, PhotoCheckScreen, PlannerScreen, VoiceGuideScreen } from './smart';
import { AdvanceScreen, BenefitsScreen, CommunityScreen, KitShopScreen } from './extras';
import { CareerScreen, DocumentsScreen, SavingsScreen, SwapJobScreen } from './growth';

/** Screens owned by this area. Keys are the shared route names listed in ../ROUTES.md. */
export const routes: RouteMap = {
  voiceGuide: VoiceGuideScreen, demandMap: DemandMapScreen, photoCheck: PhotoCheckScreen, planner: PlannerScreen,
  benefits: BenefitsScreen, advance: AdvanceScreen, kitShop: KitShopScreen, community: CommunityScreen,
  career: CareerScreen, documents: DocumentsScreen, swapJob: SwapJobScreen, savings: SavingsScreen,
};
