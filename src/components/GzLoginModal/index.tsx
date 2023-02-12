//react引入
import { memo, useState, useImperativeHandle, forwardRef } from "react";
//redux引入
import { useDispatch } from "react-redux";
import { changeToken, getMenu } from "@store/system";
//service引入
import { loginService } from "@service/login";
//antd引入
import Modal from "antd/lib/modal";
import notification from "antd/lib/notification";
import { useForm } from "antd/lib/form/Form";
//外部组件引入
import GzForm from "@components/GzForm";
import config from "./config";
import { FromFatherProps } from "./type";

const GzLoginModal = memo(
  forwardRef((props: FromFatherProps, ref) => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    useImperativeHandle(ref, () => {
      return {
        handleOpen: () => {
          setIsModalOpen(true);
        },
      };
    });
    const handleOk = () => {
      form
        .validateFields()
        .then(
          (result) => {
            return loginService(result.user, result.password);
          },
          (reject) => {
            notification.error({
              message: reject.errorFields[0].errors[0],
            });
            return {
              code: -1,
              message: reject.errorFields[0].errors[0],
            };
          }
        )
        .then((result) => {
          if (typeof result.message !== "string") {
            const token = "Bearer " + result.message.token;
            dispatch(changeToken(token));
            dispatch<any>(getMenu({ token, dispatch }));
            form.resetFields();
            setIsModalOpen(false);
          }
        });
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <Modal
        title="用户登录"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <GzForm
          form={form}
          config={config}
          style={{ width: 320, margin: "0 auto", flexDirection: "row-reverse" }}
        />
      </Modal>
    );
  })
);

export default GzLoginModal;
