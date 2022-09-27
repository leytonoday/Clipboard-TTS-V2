import {
  faSliders,
  faToolbox,
  faPaintBrush,
  faCode,
  faInfoCircle,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import {
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom';
import React                      from 'react';
import OptionHeader               from "renderer/components/options/common/OptionHeader";
import SubOptionButton            from "renderer/components/options/common/SubOptionButton";
import { Box }   from '@chakra-ui/react';

const SettingsOption: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/option/settings/' ? ( // This is to allow for sub-options. Perhaps make a more elegant method in the future
        <Outlet />
      ) : (
        <Box>
          <OptionHeader
            title="Settings"
            subtitle="Here you can change the look, feel and behaviour of the application"
          />

          <SubOptionButton
            icon={faSliders}
            title="General Management"
            subtitle="General settings and management"
            onClick={() => navigate("sub-options/general-management-settings")}
          />

          <SubOptionButton
            icon={faToolbox}
            title="Options Bar"
            subtitle="Enable or disable previews, re-order options and configure the options bar position"
            onClick={() => navigate("sub-options/options-bar-settings")}
          />

          <SubOptionButton
            icon={faPaintBrush}
            title="Appearance"
            subtitle="Configure theme and accent colour"
            onClick={() => navigate("sub-options/appearance-settings")}
          />

          <SubOptionButton
            icon={faLightbulb}
            title="Help"
            subtitle="Instructions, tips and tricks, FAQs, and keyboard shortcuts"
            onClick={() => navigate("sub-options/help")}
          />

          <SubOptionButton
            icon={faInfoCircle}
            title="Info"
            subtitle="Version, author, and credits"
            onClick={() => navigate("sub-options/info")}
          />


          <SubOptionButton
            icon={faCode}
            title="Developer Settings"
            subtitle="Developer settings for debugging"
            onClick={() => navigate("sub-options/developer-settings")}
          />
        </Box>
      )}
    </>
  );
};

export default SettingsOption;
