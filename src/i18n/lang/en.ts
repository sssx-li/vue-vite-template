const en = {
  title: 'Management System',
  nav: {
    login: 'useLogin',
    logout: 'Logout',
    home: 'Home',
    form: 'Form',
    table: 'TableEnum{subTitle}',
    dark: 'Dark',
    light: 'Light',
  },
  errorTip: {
    please_enter_username: 'Please enter username.',
    please_enter_password: 'Please enter password.',
    username_length:
      'The username must be between {min} and {max} characters in length.',
    password_length:
      'The password must be between {min} and {max} characters in length.',
  },
  table: {
    username: 'Username',
    search: 'Search',
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    age: 'Age',
    sex: 'Sex',
    ok: 'Ok',
    cancel: 'Cancel',
    man: 'man',
    woman: 'woman',
    create_time: 'Create Time',
    operate: 'Operate',
    tips: {
      enter_username: 'Please enter username.',
      enter_age: 'Please enter age.',
      select_sex: 'Please select sex.',
      age_must_be_a_number: 'Age must be a number.',
    },
  },
  tips: {
    tip: 'Tip',
    success: 'Success',
    ok: 'Ok',
    cancel: 'Cancel',
    create: 'Create',
    delete: 'Delete',
    edit: 'Edit',
    create_success: '@:tips.create @:tips.success',
    edit_success: '@:tips.edit @:tips.success',
    delete_success: '@:tips.delete @:tips.success',
    delete_confirm:
      'Are you sure you want to delete the record for {desc}? Please note that this action is irreversible.',
  },
  requestErrorTips: {
    request_canceled: 'Request canceled.',
    login_expired: 'useLogin expired. Please log in again.',
    request_failed: 'Request failed. Please try again later.',
    require_error: 'Request error. Please verify and try again.',
  },
};

export type LangTypes = typeof en;

export default en;
