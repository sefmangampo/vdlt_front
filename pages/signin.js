import React, { useRef } from "react";
import Form, {
  GroupItem,
  SimpleItem,
  ButtonItem,
  EmailRule,
  RequiredRule,
} from "devextreme-react/form";
import notify from "devextreme/ui/notify";
import { useRouter } from "next/dist/client/router";

import { signIn } from "../data";
import Header from "../components/Header";

import styles from "../styles/Register.module.css";

export default function SignIn() {
  const formRef = useRef();
  const router = useRouter();

  const handleSubmit = async () => {
    const formInstance = formRef.current.instance;
    const formData = formInstance.option("formData");

    if (formInstance.validate().isValid) {
      const { username, password } = formData;
      const response = await signIn(username, password);

      if (response.data.error) {
        notify(
          {
            message: "Invalid Credentials",
            position: {
              my: "center top",
              at: "center top",
            },
          },
          "error",
          3000
        );
      } else {
        notify(
          {
            message: "Log in Success, redirecting",
            position: {
              my: "center top",
              at: "center top",
            },
          },
          "success",
          3000
        );
        setTimeout(() => {
          router.push("/entry");
        }, 1000);
      }
    }
  };

  const buttonOptions = {
    text: "Sign In",
    type: "success",
    useSubmitBehavior: false,
    onClick: handleSubmit,
  };

  const formElAttr = {
    class: styles.formItem,
  };

  const pwOptions = {
    mode: "password",
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Header />
      </div>
      <div className={styles.body}>
        <form>
          <Form ref={formRef} elementAttr={formElAttr}>
            <GroupItem caption="Sign In">
              <SimpleItem dataField="username">
                <RequiredRule />
              </SimpleItem>
              <SimpleItem dataField="password" editorOptions={pwOptions}>
                <RequiredRule />
              </SimpleItem>
              <ButtonItem buttonOptions={buttonOptions} />
            </GroupItem>
          </Form>
        </form>
      </div>
    </div>
  );
}
