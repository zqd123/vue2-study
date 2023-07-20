interface VNode{
    tag?:string;// 当前节点的标签名（可选，比如文本节点就没有tag）
    data?:VNodeData;// 当前节点的数据对象，VNodeData类型
    children?:VNode[];// 子节点，数组，也是VNode类型
    text?:string;//当前节点的文本，（一般文本节点或注释节点会有该属性，通常是子节点是文本时才有）
    elm?:Node; // 当前虚拟节点对应的真是DOM节点
    ns?:string;// 节点的namespace（搞不懂？）
    context?:Vue; // 编译作用域（为什么会是Vue？）
    key?:string; // 节点的key属性，用于作为节点的标识，有利于patch的优化
    componentOptions?:VNodeComponentOptions; //创建组件实例时会用到的选项信息
    componentInstance?:Vue; //当前节点对应的组件实例
    parent?:VNode;// 组件的占位节点（what？）
    raw?:boolean;// 是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false
    isStatic?:boolean;// 静态节点标志
    isRootInsert?:boolean;// 是否作为根节点插入，被<transition>包裹的节点，该属性的值为true
    isComment?:boolean;// 当前节点是否为注释节点

}

interface VNodeData{}
interface Vue{}
interface VNodeComponentOptions{}