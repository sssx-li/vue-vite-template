import { TLangConfig } from './en';

const zh: TLangConfig = {
  title: '后台管理系统',
  nav: {
    login: '登录',
    logout: '登出',
    home: '首页',
    form: '表单',
    table: '表格{subTitle}',
  },
  errorTip: {
    please_enter_username: '请输入用户名',
    please_enter_password: '请输入密码',
    username_length: '用户名长度为{min}~{max}个字符',
    password_length: '密码长度为{min}~{max}个字符',
  },
  table: {
    username: '用户名',
    search: '搜索',
    create: '新增',
    edit: '编辑',
    delete: '删除',
    age: '年龄',
    sex: '性别',
    ok: '确认',
    cancel: '取消',
    man: '男',
    woman: '女',
    create_time: '创建时间',
    operate: '操作',
    tips: {
      enter_username: '请输入用户名',
      enter_age: '请输入年龄',
      select_sex: '请选择性别',
      age_must_be_a_number: '年龄必须为数字',
    },
  },
  tips: {
    tip: '提示',
    success: '成功',
    ok: '确认',
    cancel: '取消',
    create: '创建',
    delete: '删除',
    edit: '编辑',
    create_success: '@:tips.create@:tips.success',
    edit_success: '@:tips.edit@:tips.success',
    delete_success: '@:tips.delete@:tips.success',
    delete_confirm: '确定要删除 {desc} 这条记录吗? 删除之后不能恢复哦！',
  },
  requestErrorTips: {
    request_canceled: '请求取消',
    login_expired: '登录过期，请重新登录',
    request_failed: '请求失败，请稍后再试',
    require_error: '请求错误，请确认后再试',
  },
};

export default zh;
