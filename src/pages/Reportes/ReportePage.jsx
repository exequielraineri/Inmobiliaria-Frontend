/* eslint-disable react/prop-types */
import { Tab, Tabs } from "react-bootstrap";
import { ContratoTab } from "./ContratoTab";
import { GastosTab } from "./GastosTab";
import { InquilinoTab } from "./InquilinoTab";

export const ReportePage = () => {
  return (
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Inquilinos">
        <InquilinoTab />
      </Tab>
      <Tab eventKey={2} title="Contratos">
        <ContratoTab />
      </Tab>
      <Tab eventKey={3} title="Gastos">
        <GastosTab />
      </Tab>
    </Tabs>
  );
};
