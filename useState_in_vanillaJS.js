class useState {
    constructor(defaultt=""){ 
        this.state = { value: defaultt}
        const handler = {
                set: () => {
                    return false
                }
            }
        const data = new Proxy(this.state,handler);
        const stateBind = this.setState.bind(this)
        return [data, stateBind];
    }
    setState(variable){
        this.state.value = variable
    }
}

const [like,setLike] = new useState(0)
console.log(like.value) // 0
like.value=2;
console.log(like.value) // 0
setLike(like.value + 1) 
console.log(like.value) // 1