// 全局引入tab组件
Vue.component('tabs',{
    template:`
    <div class="tabs">

        <div class="tabs-bar">
            <!-- 标签页标题，这里要用v-for -->
            <div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)">
                {{item.label}}
            </div>
        </div>
        <div class="tabs-content">
            <!-- 这里的slot就是嵌套的pane -->
            <slot></slot>
        </div>
    </div>
    `,
    props:{
        //这里的value是为了可以使用v-model
        value:{
            type:[String,Number]
        }
    },
    data(){
        return {
            //因为不能修改value，所以复制一份自己维护
            currentValue:this.value,
            //用于渲染tabs的标题
            navList:[]
        }
    },
    mounted(){
        // this.getTabs(); \
        console.log(this.$children);
    },
    methods:{
        tabCls(item){
            return [
                'tabs-tab',
                {
                    //给当前选中的tab加一个class
                    'tabs-tab-active':item.name === this.currentValue
                }
            ]
        },
        getTabs(){  
            //通过遍历子组件，得到所有的pane组件
            return this.$children.filter((item) => {
                 return item.$options.name === 'pane';
            })
        },
        updateNav(){
            this.navList = [];
            //设置对this的引用，在function回调里，this指向的并不是Vue实例
            var _this = this;
            this.getTabs().forEach((pane,index)=>{
                _this.navList.push({
                    label:pane.label,
                    name:pane.name || index
                });
                //如果没有给pane设置name，默认设置它的索引
                if(!pane.name) pane.name = index;
                //设置当前选中的tab的索引
                if(index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name || index;
                    }
                }
            }
            );
            this.updateStatus();
        },
        updateStatus(){
            var tabs = this.getTabs();
            var _this = this;
            //显示当前选中的tab对应的pane组件，隐藏没有选中的
            tabs.forEach((tab)=>{
                return tab.show = tab.name === _this.currentValue;
            }
            )
        },
        //点击tab标题时触发
        handleChange(index){
            var nav = this.navList[index];
            var name = nav.name;
            //改变当前选中的tab，并触发下面的watch
            this.currentValue = name;
            //更新value
            this.$emit('input',name);
            //触发一个自定义事件，供父级使用
            this.$emit('on-click',name);
        }
    },
    watch:{
        value(val){
            this.currentValue = val;
        },
        currentValue(){
            //在当前选中的tab发生变化时，更新pane的显示状态
            this.updateStatus();
        }
    }
}
)
