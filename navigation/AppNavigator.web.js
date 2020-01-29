import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import SubmissionStack from './SubmissionStack';

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Submission: SubmissionStack,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
