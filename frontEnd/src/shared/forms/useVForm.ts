import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSave = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return {
    formRef,
    save: handleSave,
  };
};
