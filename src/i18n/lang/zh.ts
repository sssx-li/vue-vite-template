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
};

export default zh;
