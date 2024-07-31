import { useUserStore } from "@/store/UserStore";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface RoleButtonsProps {
  onClick?: () => void;
}

export const RoleButtons: React.FC<RoleButtonsProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const { assignRole } = useUserStore();

  const handleRoleClick = (selectedRole: string) => {
    assignRole(selectedRole);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleRoleClick("EMPLOYEE")}
      >
        {t("employee")}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleRoleClick("TECHNICIAN")}
      >
        {t("technician")}
      </Button>
    </Box>
  );
};
