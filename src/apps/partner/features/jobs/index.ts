import type { RouteMap } from '@/native/ui';
import { HomeScreen } from './screens/HomeScreen';
import { JobRequestScreen } from './screens/JobRequestScreen';
import { OnJobScreen } from './screens/OnJobScreen';
import { JobsScreen } from './screens/JobsScreen';
import { CheckInScreen } from './screens/CheckInScreen';
import { SelfieScreen } from './screens/SelfieScreen';
import { LiveScreen } from './screens/LiveScreen';
import { CheckOutScreen } from './screens/CheckOutScreen';
import { FinishCodeScreen } from './screens/FinishCodeScreen';
import { FinishHappyScreen } from './screens/FinishHappyScreen';
import { FinishNotHappyScreen } from './screens/FinishNotHappyScreen';
import { ShiftCheckScreen } from './screens/ShiftCheckScreen';
import { DoorCodeScreen } from './screens/DoorCodeScreen';
import { RouteScreen } from './screens/RouteScreen';
import { PhotoCheckScreen } from './screens/PhotoCheckScreen';
import { VoiceGuideScreen } from './screens/VoiceGuideScreen';
import { SwapJobScreen } from './screens/SwapJobScreen';
import { RateCustomerScreen } from './screens/RateCustomerScreen';
import { TimeOffScreen } from './screens/TimeOffScreen';
import { DemandMapScreen } from './screens/DemandMapScreen';

/**
 * Jobs feature — public API of this folder. Other features import only from here.
 * Routes: home, jobRequest, onJob, jobs, checkIn, selfie, live, checkOut, finishCode, finish.happy, finish.notHappy, shiftCheck, doorCode, route, photoCheck, voiceGuide, swapJob, rateCustomer, timeOff, demandMap
 */
export const routes: RouteMap = {
  home: HomeScreen, jobRequest: JobRequestScreen, onJob: OnJobScreen, jobs: JobsScreen,
  checkIn: CheckInScreen, selfie: SelfieScreen, live: LiveScreen, checkOut: CheckOutScreen,
  finishCode: FinishCodeScreen, 'finish.happy': FinishHappyScreen, 'finish.notHappy': FinishNotHappyScreen,
  shiftCheck: ShiftCheckScreen, doorCode: DoorCodeScreen, route: RouteScreen, photoCheck: PhotoCheckScreen,
  voiceGuide: VoiceGuideScreen, swapJob: SwapJobScreen, rateCustomer: RateCustomerScreen, timeOff: TimeOffScreen,
  demandMap: DemandMapScreen,
};

export {
  HomeScreen, JobRequestScreen, OnJobScreen, JobsScreen, CheckInScreen, SelfieScreen, LiveScreen, CheckOutScreen,
  FinishCodeScreen, FinishHappyScreen, FinishNotHappyScreen, ShiftCheckScreen, DoorCodeScreen, RouteScreen,
  PhotoCheckScreen, VoiceGuideScreen, SwapJobScreen, RateCustomerScreen, TimeOffScreen, DemandMapScreen,
};

/* Pieces other features reuse (the status screens show the same task list and finish button). */
export { TaskList } from './components/TaskList';
export { FinishButton } from './components/FinishButton';
export { newJob } from './data';
export { hoursLabel, partnerName, serviceTitle } from './job';
export { useJobsState, type Job, type JobsState } from './state';
