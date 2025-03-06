import { Box, Button, Divider, Drawer, IconButton, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export default function FiltersRightMenu(props) {
    const {
        open,
        formData,
        onClose,
        onUpdateFormData,
        onClearFilters,
        onApplyFilters,
    } = props;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => onClose()}
            PaperProps={{
                sx: { width: 300, padding: 2 },
            }}
        >
            <Box
                display="flex"
                justifyContent="start"
                gap={3}
                alignItems="center"
                mb={2}
            >
                <IconButton onClick={() => onClose()} size="small">
                    <ClearIcon sx={{ color: "#0CA6BF" }} />
                </IconButton>

                <p>Filtros</p>
            </Box>

            <Divider style={{ width: "100%" }} />

            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                height="100%"
                my={2}
            >
                <TextField
                    InputProps={{
                        notched: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    fullWidth
                    label="ID do Cliente"
                    value={formData.id}
                    onChange={(e) => onUpdateFormData("id", e.target.value)}
                    placeholder="Digite o ID do Cliente"
                    variant="outlined"
                    style={{
                        width: "100%",
                        marginTop: 20,
                        color: "#3C3C3C",
                        fontSize: 12
                    }}
                />

                <TextField
                    InputProps={{
                        notched: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    fullWidth
                    label="Nome do Cliente"
                    value={formData.name}
                    onChange={(e) => onUpdateFormData("name", e.target.value)}
                    placeholder="Digite o Nome do Cliente"
                    variant="outlined"
                    style={{
                        width: "100%",
                        marginTop: 20,
                        color: "#3C3C3C",
                        fontSize: 12
                    }}
                />

                <TextField
                    InputProps={{
                        notched: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    fullWidth
                    label="E-mail do Cliente"
                    value={formData.email}
                    onChange={(e) => onUpdateFormData("email", e.target.value)}
                    placeholder="Digite o E-mail do Cliente"
                    variant="outlined"
                    style={{
                        width: "100%",
                        marginTop: 20,
                        color: "#3C3C3C",
                        fontSize: 12
                    }}
                />
            </Box>

            <Box
                display="flex"
                flex={1}
                marginBottom={8}
                gap={2}
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <Button
                    variant="outlined"
                    onClick={() => onClearFilters()}
                    sx={{
                        width: "40%",
                        borderColor: "#97979752",
                        color: "#3C3C3C",
                        backgroundColor: "#ffff",
                        "&:hover": {
                            backgroundColor: "#F4F4F4",
                        },
                    }}
                >
                    Limpar
                </Button>

                <Button
                    variant="contained"
                    onClick={() => onApplyFilters()}
                    sx={{
                        width: "40%",
                        backgroundColor: "#0CA6BF",
                        color: "#FFFFFF",
                        "&:hover": {
                            backgroundColor: "#0098B2",
                        },
                    }}
                >
                    Aplicar
                </Button>
            </Box>
        </Drawer>
    );
}