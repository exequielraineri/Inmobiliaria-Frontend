/* eslint-disable react/prop-types */
import { Tab, Tabs } from "react-bootstrap";
import { InquilinoTab } from "./InquilinoTab";

export const ReportePage = () => {
  return (
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Inquilinos">
        <InquilinoTab />
      </Tab>
    </Tabs>
  );
};
