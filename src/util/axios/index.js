import http from './axios'

//封装菜单列表接口
export function getMenuList(){
    return http.get('/api/menulist?istree=true')
}
//封装添加菜单接口
export function addMenu(data){
    return http.post('/api/menuadd',data)
}
//封装删除菜单接口
export function delMenu(data){
    return http.post('/api/menudelete',data)
}
//封装菜单接口获取一条数据的接口
export function getOneMenu(params){
    return http.get('/api/menuinfo',{params})
}
//封装修改菜单的编辑接口
export function editMenu(data){
    return http.post('/api/menuedit',data)
}

//封装角色列表接口
export function getRoleList(){
    return http.get('/api/rolelist')
}
//封装添加角色列表的接口
export function addRole(data){
    return http.post('/api/roleadd',data)
}
//封装删除角色列表的接口
export function deleteRole(data){
    return http.post('/api/roledelete',data)
}
//封装修改角色列表的接口
export function editRole(data){
    return http.post('/api/roleedit',data)
}
//封装获取一条数据角色列表的接口
export function getOneRole(params){
    return http.get('/api/roleinfo',{params})
}

//封装管理员列表接口
export function getManagerList(params){
    return http.get('/api/userlist',{params})
}
// 封装添加管理员列表接口
export function addManager(data){
    return http.post('/api/useradd',data)
}
//封装管理员删除接口
export function delManager(data){
    return http.post('/api/userdelete',data)
}
//修改管理员接口
export function editManager(data){
    return http.post('/api/useredit',data)
}
//封装管理员接口获取一条数据的接口
export function getOneManager(params){
    return http.get('/api/userinfo',{params})
}
//封装管理员接口获取数据的总数
export function getCount(){
    return http.get('/api/usercount')
}
//封装用户登录接口
export function userLogin(data){
    return http.post('/api/userlogin',data)
}

//===========商品分类==================
// 商品分类列表
export function getClassifyList(){
    return http.get('/api/catelist',{
        params:{
            istree:true
        }
    })
}
// 商品分类添加列表
export function addClassify(data){
    let file = new FormData();
          //FormData 数据的添加只能用append ,获取值也只能用get方式获取
          //循环添加 对象 转化成了 FormData这种格式
          for (let i in data) {
            file.append(i, data[i]);
          }
    return http.post('/api/cateadd',file)
}
// 商品分类删除列表
export function deleteClassify(data){
    return http.post('/api/catedelete',data)
}
// 商品分类修改列表
export function editClassify(data){
    return http.post('/api/cateedit',data)
}
// 商品分类获取（一条）
export function getOneClassify(params){
    return http.get('/api/cateinfo',{params})
}

//===========商品规格管理==================
// 商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{params})
}
// 商品规格添加列表
export function addSpecs(data){
    return http.post('/api/specsadd',data)
}
// 商品规格删除列表
export function deleteSpecs(data){
    return http.post('/api/specsdelete',data)
}
// 商品规格修改列表
export function editSpecs(data){
    return http.post('/api/specsedit',data)
}
// 商品规格获取（一条）
export function getOneSpecs(params){
    return http.get('/api/specsinfo',{params})
}
//封装获取商品规格数据的总数
export function getSpecsCount(){
    return http.get('/api/specscount')
}

//===========商品管理==================
// 商品管理列表
export function getGoodsList(params){
    return http.get('/api/goodslist',{params})
}
// 商品管理添加列表
export function addGoods(data){
    return http.post('/api/goodsadd',data)
}
// 商品规格删除列表
export function deleteGoods(data){
    return http.post('/api/goodsdelete',data)
}
// 商品管理修改列表
export function editGoods(data){
    return http.post('/api/goodsedit',data)
}
// 商品管理获取（一条）
export function getOneGoods(params){
    return http.get('/api/goodsinfo',{params})
}
//封装获取商品管理数据的总数
export function getGoodsCount(){
    return http.get('/api/goodscount')
}
//===========轮播图管理==================
// 轮播图管理列表
export function getBannerList(params){
    return http.get('/api/bannerlist',{params})
}
// 轮播图管理添加列表
export function addBanner(data){
    return http.post('/api/banneradd',data)
}
// 轮播图管理获取（一条）
export function getOneBanner(params){
    return http.get('/api/bannerinfo',{params})
}
// 轮播图规格删除列表
export function deleteBanner(data){
    return http.post('/api/bannerdelete',data)
}
// 轮播图管理修改列表
export function editBanner(data){
    return http.post('/api/banneredit',data)
}

//===========限时秒杀管理==================
// 限时秒杀管理列表
export function getSeckList(){
    return http.get('/api/secklist')
}
// 限时秒杀管理添加列表
export function addSeck(data){
    return http.post('/api/seckadd',data)
}
// 限时秒杀管理获取（一条）
export function getOneSeck(params){
    return http.get('/api/seckinfo',{params})
}
// 限时秒杀规格删除列表
export function deleteSeck(data){
    return http.post('/api/seckdelete',data)
}
// 限时秒杀管理修改列表
export function editSeck(data){
    return http.post('/api/seckedit',data)
}
//===========限时秒杀管理==================
// 会员管理列表
export function getMemberList(){
    return http.get('/api/memberlist')
}
// 会员管理获取（一条）
export function getOneMember(params){
    return http.get('/api/memberinfo',{params})
}
// 会员管理修改列表
export function editMember(data){
    return http.post('/api/memberedit',data)
}
