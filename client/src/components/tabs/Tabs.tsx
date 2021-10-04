import React, { FunctionComponent } from "react";

import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import OrigTabs, { TabsProps as OrigTabsProps } from "@material-ui/core/Tabs";
import map from "lodash/map";

interface TabPanelProps {
  value: number;
  index: number;
}

// Panel component that gets used for each tab views.
export const TabPanel: FunctionComponent<TabPanelProps> = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

// Type def for 'panels' to be shown per tab views.
export interface PanelOptions {
  label: string;
  comp: React.ReactElement;
}

interface TabsProps extends OrigTabsProps {
  value: number;
  setValue: (value: number) => void;
  panelOptions: PanelOptions[];
}

/**
 * Main Tabs component
 */
export const Tabs: FunctionComponent<TabsProps> = ({
  value,
  setValue,
  panelOptions,
}) => {
  return (
    <>
      <AppBar position="static">
        <OrigTabs
          textColor="primary"
          value={value}
          onChange={(e: React.ChangeEvent<{}>, newValue: number) => {
            setValue(newValue);
          }}
        >
          {map(panelOptions, (panelOption, idx) => (
            <Tab key={`${panelOption.label}`} label={panelOption.label} />
          ))}
        </OrigTabs>
      </AppBar>

      {map(panelOptions, (panelOption, idx) => (
        <TabPanel value={value} index={idx} key={`${panelOption.label}-comp`}>
          {panelOption.comp}
        </TabPanel>
      ))}
    </>
  );
};
