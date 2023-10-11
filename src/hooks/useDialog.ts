import type { FormInstance, FormRules } from 'element-plus';

export type DialogType = 'create' | 'edit';
export type DialogCallbackType = DialogType | 'close';
export interface DialogParams {
  visible: boolean;
  loading: boolean;
  type: DialogType;
}

/**
 *
 * @param url 编辑、新增接口路径
 * @param queryForm 表单
 * @param validateRules 表单规则
 * @param callback 回调函数(编辑/新增成功后的回调)
 * @returns
 */
export function useDialog<T extends object>({
  url = '',
  queryForm = {} as T,
  validateRules = {},
  callback = () => {},
}: {
  url?: string;
  queryForm?: T;
  validateRules?: ComputedRef<FormRules> | FormRules;
  callback?: (type: DialogCallbackType) => any;
}) {
  const { success } = useMessage();
  // 表单
  const formInline = reactive<T>({ ...queryForm });
  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>(validateRules as FormRules);
  // 弹窗
  const dialogParams = reactive<DialogParams>({
    visible: false,
    loading: false,
    type: 'create',
  });

  // 打开弹窗
  const openDialog = (type: DialogType, row: Record<string, any> = {}) => {
    Object.assign(
      formInline,
      type === 'create' ? { ...queryForm, ...row } : row
    );
    dialogParams.type = type;
    dialogParams.visible = true;
  };
  // 重置弹窗
  const resetDialog = () => {
    dialogParams.type = 'create';
    dialogParams.visible = false;
    dialogParams.loading = false;
    Object.assign(formInline, { ...queryForm });
    formRef.value?.resetFields();
    callback('close');
  };
  // 确认
  const handleConfirm = (): void => {
    formRef.value?.validate().then(async (valid) => {
      if (valid) {
        dialogParams.loading = true;
        dialogParams.type === 'create'
          ? await handleCreate()
          : await handleEdit();
      }
    });
  };
  // 增加
  const handleCreate = async () => {
    const { code } = await useHandleApiRes(
      ApiRequest.post({
        url,
        data: {
          ...formInline,
        },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      success('新增成功');
      await callback('create');
      resetDialog();
    }
  };
  // 编辑
  const handleEdit = async () => {
    const { code } = await useHandleApiRes(
      ApiRequest.put({
        url,
        data: {
          ...formInline,
        },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      success('编辑成功');
      await callback('edit');
      resetDialog();
    }
  };

  return {
    ...toRefs(dialogParams),
    formInline,
    formRef,
    rules,
    openDialog,
    resetDialog,
    handleConfirm,
    handleCreate,
    handleEdit,
  };
}
