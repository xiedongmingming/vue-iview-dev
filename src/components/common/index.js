//Do not modify this file, it will be autogenerated
import DropMenuDecorator  from './DropMenuDecorator';
import DynamicForm  from './DynamicForm';
import DynamicQueryForm  from './DynamicQueryForm';
import Key  from './Key';
import MenuDecorator  from './MenuDecorator';

const commonComponents = {
    DropMenuDecorator : {
       install : (Vue) =>{
           Vue.component('DropMenuDecorator',DropMenuDecorator );
       }
    },
    DynamicForm : {
       install : (Vue) =>{
           Vue.component('DynamicForm',DynamicForm );
       }
    },
    DynamicQueryForm : {
       install : (Vue) =>{
           Vue.component('DynamicQueryForm',DynamicQueryForm );
       }
    },
    Key : {
       install : (Vue) =>{
           Vue.component('Key',Key );
       }
    },
    MenuDecorator : {
       install : (Vue) =>{
           Vue.component('MenuDecorator',MenuDecorator );
       }
    },
}
export default commonComponents;