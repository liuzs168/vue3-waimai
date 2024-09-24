import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/base.css'
import 'amfe-flexible'
import './api/mock.js'


// 1. 引入你需要的组件
import { Button, Icon, Tab, Tabs, TreeSelect, Stepper, Toast } from 'vant';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant';
import { ContactCard, Card } from 'vant';
import { Dialog } from 'vant';
import { AddressList, AddressEdit } from 'vant';
import { Form, Field, CellGroup } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';


const app = createApp(App)

app.use(createPinia())
app.use(router)
// 3. 注册你需要的组件
app.use(Button);
app.use(Icon);
app.use(Tab);
app.use(Tabs);
app.use(TreeSelect);
app.use(Stepper);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Toast);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(SubmitBar);
app.use(ContactCard);
app.use(Card);
app.use(Dialog);
app.use(AddressList);
app.use(AddressEdit);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.mount('#app')
