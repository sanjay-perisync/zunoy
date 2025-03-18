import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Flag } from "lucide-react"; 


const pingLocations = [
    { code: "mumbai", name: "MUMBAI", country: "INDIA", flag: "https://www.svgrepo.com/show/405510/flag-for-flag-india.svg" },
    { code: "ohio", name: "OHIO", country: "UNITED STATES", flag: "https://dev-uptime.zoop360.com/assets/flags/flag-us.svg" },
    { code: "toronto", name: "TORONTO", country: "CANADA", flag: "https://dev-uptime.zoop360.com/assets/flags/flag-cad.svg" },
    { code: "london", name: "LONDON", country: "UNITED KINGDOM", flag: "https://dev-uptime.zoop360.com/assets/flags/flag-uk.svg" },
  ];

const AdditionalSet = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("mumbai");

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  

  return (
    <Box className="">
      <Accordion expanded={expanded} onChange={handleToggle} sx={{ boxShadow: "none", border: "1px solid #e0e0e0", borderRadius: "20px", py: 2 }}>


        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="p-4 ">
          <p className="font-semibold text-lg">
            Additional Settings
          </p>
        </AccordionSummary>
        <AccordionDetails className="p-6 flex justify-between border-t">
          <p className=" max-w-md mb-4 text-gray-500">
          In the Additional Settings field, you can configure the request timeout by specifying the maximum duration allowed for a request. If the request exceeds this duration, it will be marked as a failure. Additionally, you have the option to enable follow redirects.
          </p>
        


          <div className="">
      <h3 className="text-gray-600 font-semibold mb-2">Ping locations</h3>
      <ToggleButtonGroup
        value={selectedLocation}
        exclusive
        onChange={(e, newLocation) => {
          if (newLocation) setSelectedLocation(newLocation);
        }}
       
      >
        {pingLocations.map((loc) => (
          <ToggleButton
            key={loc.code}
            value={loc.code}
            className="flex flex-col items-center p-3 rounded-lg border shadow-sm"
            sx={{
              "&.Mui-selected": {
                borderColor: "#a855f7",
                backgroundColor: "#f4ebff",
              }
            }}
          >
            <img src={loc.flag} alt="" className="w-8 h-8 rounded-sm" />

            <span className="font-bold text-sm">{loc.name}</span>
            <span className="text-xs text-gray-500">{loc.country}</span>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AdditionalSet;
