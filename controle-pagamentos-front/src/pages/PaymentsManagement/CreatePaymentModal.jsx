import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function CreatePaymentModal(props) {
    const {
        open,
        onClose,
        formData,
        updateFormData,
        clients,
        onCreate
    } = props;

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            maxWidth="md"
            fullWidth
            scroll="paper"
            style={{ padding: 12 }}
        >
            <DialogTitle>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                >
                    <p
                        style={{
                            color: "#3C3C3C",
                            fontWeight: "bold"
                        }}
                    >
                        Cadastrar novo pagamento
                    </p>
                    <Box style={{ cursor: "pointer" }} onClick={() => onClose()}>
                        x
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                >
                    <Grid container spacing={2} marginTop={1}>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                options={clients}
                                getOptionLabel={(option) => `${option?.name}`}
                                renderInput={
                                    (params) => (
                                        <TextField
                                            {...params}
                                            label="Cliente *"
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps,
                                                notched: true
                                            }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={formData.client}
                                            placeholder="Selecione o cliente"
                                        />
                                    )
                                }
                                value={formData.client}
                                onChange={(e, newValue) => updateFormData("client", newValue)}
                                disableClearable
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <NumericFormat
                                value={formData.value}
                                onValueChange={(value) => updateFormData("value", value.floatValue || 0)}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="R$ "
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale
                                customInput={TextField}
                                fullWidth
                                label="Valor *"
                                variant="outlined"
                                placeholder="Informe o valor do pagamento"
                            />

                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginTop={1}>
                        <Grid item xs={6}>
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
                                                label: "Data *",
                                                placeholder: "Selecione a data do pagamento",
                                                InputProps: { notched: true, readOnly: true },
                                                onKeyDown: (e) => e.preventDefault(),
                                                InputLabelProps: { shrink: true },
                                                fullWidth: true,
                                                variant: "outlined",
                                            }
                                        }}
                                        value={formData.date}
                                        onChange={(newValue) => updateFormData("date", newValue)}
                                        format="DD/MM/YYYY"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    width="100%"
                    gap={2}
                >
                    <Button
                        variant="outlined"
                        onClick={() => onClose()}
                        sx={{
                            width: 100,
                            borderColor: "#97979752",
                            color: "#3C3C3C",
                            backgroundColor: "#ffff",
                            "&:hover": {
                                backgroundColor: "#F4F4F4",
                            },
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => onCreate()}
                        sx={{
                            width: 100,
                            backgroundColor: "#0CA6BF",
                            color: "#FFFFFF",
                            "&:hover": {
                                backgroundColor: "#0098B2",
                            },
                        }}
                        disabled={!formData?.client || !formData?.value || !formData?.date}
                    >
                        Salvar
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}