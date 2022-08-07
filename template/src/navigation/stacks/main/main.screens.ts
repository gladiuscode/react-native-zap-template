import Contacts from '../../../screens/contacts/contacts.screen';
import Home from '../../../screens/home/home.screen';
import { MainScreen, MainScreens } from './main.types';

const mainScreens: MainScreen[] = [{
  component: Home,
  name: MainScreens.home,
},{
  component: Contacts,
  name: MainScreens.contacts,
}];

export default mainScreens;
