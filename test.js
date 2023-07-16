
//q: 如何实现递归修改arr，为每个对象增加一个age属性

const arr = [
    {
        id:1,
        name:'a',
        children:[
            {
                id:11,
                name:'aa',  
                children:[
                    {
                        id:111,
                        name:'aaa',
                        children:[]
                    }
                ]
            },
        ]
        
    },
    {
        id:2,
        name:'b',
        children:[
            {
                id:22,
                name:'bb',
                children:[]
            }
        ]
    }
]
// 如何实现递归修改arr，为每个对象增加一个age属性
function addAge(arr){
    arr.forEach(item=>{
        item.age = 18;
        if(item.children.length){
            addAge(item.children)
        }
    })
}