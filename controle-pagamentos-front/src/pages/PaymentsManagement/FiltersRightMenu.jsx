import { Autocomplete, Box, Button, Divider, Drawer, IconButton, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function FiltersRightMenu(props) {
    const {
        open,
        formData,
        onClose,
        onUpdateFormData,
        onClearFilters,
        onApplyFilters,
    } = props;

    const statusOptions = [
        { status: "PENDENTE", label: "Pendente" },
        { status: "PAGO", label: "Pago" },
        { status: "CANCELADO", label: "Cancelado" },
    ];

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
                    label="ID do Pagamento"
                    value={formData.id}
                    onChange={(e) => onUpdateFormData("id", e.target.value)}
                    placeholder="Digite o ID do Pagamento"
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
                    value={formData.clientName}
                    onChange={(e) => onUpdateFormData("clientName", e.target.value)}
                    placeholder="Digite o Nome do Cliente"
                    variant="outlined"
                    style={{
                        width: "100%",
                        marginTop: 20,
                        color: "#3C3C3C",
                        fontSize: 12
                    }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={['DatePicker']}
                        sx={{
                            width: '100%',
                            paddingTop: 0,
                            overflow: "inherit"
                        }}
                    >
                        <DatePicker
                            slotProps={{
                                textField: {
                                    label: "Data",
                                    placeholder: "Selecione a data do pagamento",
                                    InputProps: { notched: true, readOnly: true },
                                    onKeyDown: (e) => e.preventDefault(),
                                    InputLabelProps: { shrink: true },
                                    fullWidth: true,
                                    variant: "outlined",
                                }
                            }}
                            value={formData.date}
                            onChange={(newValue) => onUpdateFormData("date", newValue)}
                            format="DD/MM/YYYY"
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <Autocomplete
                    disablePortal
                    options={statusOptions}
                    getOptionLabel={(option) => `${option?.label}`}
                    renderInput={
                        (params) => (
                            <TextField
                                {...params}
                                label="Status"
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    notched: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={formData.client}
                                placeholder="Selecione o status"
                            />
                        )
                    }
                    value={formData.sattus}
                    onChange={(e, newValue) => onUpdateFormData("status", newValue)}
                    disableClearable
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