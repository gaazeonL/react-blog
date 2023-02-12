import { memo, useRef } from "react";
import changekeyPath from "@hooks/changekeyPath";
import GzcurdPage from "@components/GzcurdPage";
import { selectFormConfig, getTableConfig } from "./config";
const settingPermissions = memo(() => {
  changekeyPath();
  const curdPageRef = useRef<any>(null);
  const tableConfig = getTableConfig(curdPageRef);
  return (
    <>
      <GzcurdPage
        selectFormConfig={selectFormConfig}
        tableConfig={tableConfig}
        ref={curdPageRef}
      />
    </>
  );
});

export default settingPermissions;
