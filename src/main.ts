import './style.css';

import '@varlet/ui/es/style';

import App from './app.vue';
import { createApp } from 'vue';
import {
  Select,
  Input,
  StyleProvider,
  Themes,
  Option,
  Button,
  Checkbox,
  DatePicker,
  Locale,
  Divider,
  Space,
  Form
} from '@varlet/ui';

const app = createApp(App);

app
  .use(Select)
  .use(Input)
  .use(Option)
  .use(Checkbox)
  .use(Button)
  .use(DatePicker)
  .use(Divider)
  .use(Space)
  .use(Form);

Locale.add('en-US', Locale.enUS);
Locale.use('en-US');

Select.setPropsDefaults({
  variant: 'outlined'
});
Input.setPropsDefaults({
  variant: 'outlined'
});

StyleProvider(Themes.md3Dark);

app.mount('#app');
