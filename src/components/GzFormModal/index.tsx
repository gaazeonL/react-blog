//react引入
import {
  memo,
  useState,
  useImperativeHandle,
  forwardRef,
  Fragment,
} from "react";
//antd引入
import Modal from "antd/lib/modal";
import notification from "antd/lib/notification";
import { useForm } from "antd/lib/form/Form";
//i18n引入
import { useTranslation } from "react-i18next";
//外部组件引入
import GzForm from "@components/GzForm";
import { FromFatherProps } from "./type";
import { useSelector } from "react-redux";
import { storeType } from "@store/type";

const GzFormModal = memo(
  forwardRef<any, FromFatherProps>((props, ref) => {
    const [form] = useForm();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    //打开对话框时传值，只能通过这种奇怪的方式传值了
    const [servicePayload, setServicePayload] = useState<{ [x: string]: any }>(
      {}
    );
    //获取token，不管会不会用到
    const token = useSelector<storeType, string>(
      (store) => store.system.globalControl.token
    );
    useImperativeHandle(ref, () => {
      return {
        handleOpen: (
          servicePayload?: { [x: string]: any },
          formInitialValues?: { [x: string]: any }
        ) => {
          //设置表单默认值
          if (formInitialValues) {
            Object.entries(formInitialValues).forEach(([k, v]) => {
              form.setFieldValue(k, v);
            });
          }
          if (!servicePayload) {
            servicePayload = {};
          }
          setServicePayload(servicePayload);
          setIsModalOpen(true);
        },
      };
    });
    const handleOk = () => {
      setConfirmLoading(true);
      form
        .validateFields()
        .then(
          (result) => {
            //验证成功后把验证成功的结果加入token并且传给传入的service
            const options = {
              token,
              ...servicePayload,
              ...result,
            };
            return props.service(options);
          },
          (reject) => {
            //验证失败通知框会显示最近的一个错误
            notification.error({
              message: reject.errorFields[0].errors[0],
            });
            setConfirmLoading(false);
            return {
              code: -1,
              message: reject.errorFields[0].errors[0],
            };
          }
        )
        .then(
          (result) => {
            if (result.code === 0) {
              //验证成功后就会执行成功的回调函数，并且清除对话框里面的内容
              props.onServiceFullfilled &&
                props.onServiceFullfilled(result, notification.success, t);
              form.resetFields();
              setIsModalOpen(false);
            }
            setConfirmLoading(false);
          },
          (reject) => {
            props.onServiceRejected &&
              props.onServiceRejected(reject, notification.error, t);
            setConfirmLoading(false);
          }
        );
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <Modal
        title={props.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <GzForm form={form} config={props.formConfig} style={props.formStyle}>
          <div slot="header">{props.formHeader}</div>
          <div slot="footer">{props.formFooter}</div>
        </GzForm>
      </Modal>
    );
  })
);

export default GzFormModal;
