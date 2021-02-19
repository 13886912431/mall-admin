import Vue from "vue";
import {
    Button,
    Menu,
    Icon,
    breadcrumb,
    FormModel,
    Input,
    Message,
    Card,
    Row,
    Col,
    Select,
    Table,
    Modal,
    Steps,
    Upload,
    Checkbox,
    ConfigProvider,
} from "ant-design-vue";

Vue.prototype.$modal = Modal;
Vue.prototype.$message = Message;

Vue.use(Button)
    .use(Menu)
    .use(Icon)
    .use(breadcrumb)
    .use(FormModel)
    .use(Input)
    .use(Card)
    .use(Row)
    .use(Col)
    .use(Select)
    .use(Table)
    .use(Steps)
    .use(Upload)
    .use(Checkbox)
    .use(Modal)
    .use(ConfigProvider);
