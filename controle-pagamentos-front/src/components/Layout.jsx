import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export default function Layout() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#ffff",
            }}
        >
            <Drawer
                sx={{
                    width: 320,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 320,
                        boxSizing: "border-box",
                        borderRight: "dashed 1px #D9D9D9",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "#ffff",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "100px"
                    }}
                >
                    <List>
                        <Box>
                            <ListItemButton
                                onClick={() => navigate("/")}
                                sx={{
                                    pl: 2,
                                    "&:hover": { backgroundColor: "#3CE4FF14" },
                                    ...(window.location.pathname.includes("clientes") && {
                                    backgroundColor: "#3CE4FF14",
                                    "& .MuiListItemIcon-root": { color: "#0CA6BF" },
                                    "& .MuiListItemText-primary": { color: "#0CA6BF" },
                                    }),
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <PeopleAltIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Gerenciar clientes"
                                    primaryTypographyProps={{
                                        sx: { color: window.location.pathname.includes("clientes") ? "#0CA6BF" : "#6E6E6E" },
                                    }}
                                />
                            </ListItemButton>
                        </Box>
                        <Box>
                            <ListItemButton
                                onClick={() => navigate("/pagamentos")}
                                sx={{
                                    pl: 2,
                                    "&:hover": { backgroundColor: "#3CE4FF14" },
                                    ...(window.location.pathname.includes("pagamentos") && {
                                    backgroundColor: "#3CE4FF14",
                                    "& .MuiListItemIcon-root": { color: "#0CA6BF" },
                                    "& .MuiListItemText-primary": { color: "#0CA6BF" },
                                    }),
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <PointOfSaleIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Gerenciar pagamentos"
                                    primaryTypographyProps={{
                                        sx: { color: window.location.pathname.includes("pagamentos") ? "#0CA6BF" : "#6E6E6E" },
                                    }}
                                />
                            </ListItemButton>
                        </Box>
                    </List>
                </Box>
            </Drawer>
            
            <Box
                flexGrow={1}
                marginLeft="320px"
            >
                <Outlet />
            </Box>
        </Box>
    );
}