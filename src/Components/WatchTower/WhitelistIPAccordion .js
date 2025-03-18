import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WhitelistIPAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box className="">
      <Accordion expanded={expanded} onChange={handleToggle} sx={{ boxShadow: "none", border: "1px solid #e0e0e0", borderRadius: "20px", py: 2 }}>


        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="p-4 ">
          <p className="font-semibold text-lg">
            Whitelist IP Addresses
          </p>
        </AccordionSummary>
        <AccordionDetails className="p-6 flex justify-between border-t">
          <p className=" max-w-md mb-4 text-gray-500">
            To maintain seamless monitoring, we recommend updating your firewall/security settings to include our IP addresses. 
            Without this adjustment, your site's restrictions may limit our ability to track it effectively. Please whitelist these 
            IPs to ensure uninterrupted monitoring and accurate alerts.
          </p>
          <button className="bg-indigo-500 flex justify-center items-center text-white px-4 py-4 rounded-xl h-12 font-semibold">
            View IPs
          </button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default WhitelistIPAccordion;
