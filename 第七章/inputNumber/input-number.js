Vue.component('input-number',{
    template: `<div>
    <input type="text" :value="currentValue" @change="updateValue($event.target.value)">
    <button @click="currentValue += 1">+</button><button @click="currentValue -= 1">-</button></div>`,
    props:{
        max:{
            type:Number,
            default:Infinity
        },
        min:{
            type:Number,
            default:-Infinity
        },
        value:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            //如果想修改props中的值，需要在组件data中定义一个的变量
            currentValue:this.value
        }
    },
    watch:{
        //一定还要监听props中值的变化，更新当前组件中的值
        value(newVal){
            this.updateValue(newVal)
        },
        currentValue(newVal){
            this.$emit('input',newVal)
        }
    },
    methods:{
        isValueNumber(val){
            return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(val+'')
        },
        updateValue(val){
            if (this.isValueNumber(val)){
                val = Number(val);
            }else{
                val = this.currentValue;
            }
            
            if (val >= this.max) val = this.max;
            if (val <= this.min) val = this.min;
            this.currentValue = val;
            this.$emit('input',this.currentValue)
        },

    }
})