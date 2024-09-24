import { ref, computed, reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {

  /*方法二： let cartList = reactive([]) */
  let cartList = ref([])//购物车的数据
  let isDelete = ref(true) //确定header组件 点击编辑的时候 底部组件的展示
  let edit = ref(true)//默认展示编辑的状态
  let orderList = ref([])//
  let orderListEnd = ref([])
  let userAddress = ref([
    {
      id: 1001,
      name: 'jason',
      tel: '15874859686',
      province: '广东省',
      city: '深圳市',
      county: '南山区',
      addressDetail: '深圳湾',
      isDefault: true,
      areaCode: '110101',
    },
    {
      id: 1002,
      name: 'allen',
      tel: '15874859685',
      province: '湖北省',
      city: '武汉市',
      county: '武昌区',
      addressDetail: '黄鹤楼',
      isDefault: false,
      areaCode: '110101',
    },
  ])


  /**
   * 将商品添加到购物车
   * @param value 商品列表
   */
  function addcart(value: any) {
    console.log(value);
    /* 方法二： cartList = Object.assign(cartList,value) */
    cartList.value = value
    console.log('更新后的：', cartList);

  }
  /**
   * 切换购物车中的底部展示
   */
  function changeDelete() {
    isDelete.value = !isDelete.value
  }

  /**
   * 同步删除操作后端商品列表
   * @param value 编辑操作后，购物车剩余的商品的列表
   */
  function deleteGoods(value: any) {
    cartList.value = value
  }

  /**
   * 切换购物车header右侧的文字显示
   * @param value 
   */
  function changeEdit(value: any) {
    if (value) {
      edit.value = true
    } else {
      edit.value = !edit.value
    }

  }

  function pay(value: never[]) {
    orderList.value = value
  }

  function orderListEd() {
    orderListEnd.value = orderListEnd.value.concat(orderList.value)
  }

  function addaddress(value: { id: number; name: string; tel: string; province: string; city: string; county: string; addressDetail: string; isDefault: boolean; areaCode: string }) {
    userAddress.value.map(item => {
      if (value.isDefault) {
        item.isDefault = false
      }
    })
    userAddress.value.push(value)
  }

  function editaddress(value:any) {
    userAddress.value = userAddress.value.map(item => {
      if (value.isDefault) {
        item.isDefault = false
      }
      if (item.id === value.id) {
        return value
      } else {
        return item
      }
    })
  }

  function deleteaddress(value: any){
    userAddress.value.filter(item=>{
      return !(item.id === value.is)
    })
    if(value.isDefault) {
      userAddress.value[0].isDefault = true
    }
  }
  return { cartList, addcart, isDelete, changeDelete, deleteGoods, edit, changeEdit, orderList, pay, userAddress, orderListEnd, orderListEd, addaddress, editaddress,deleteaddress }
})
