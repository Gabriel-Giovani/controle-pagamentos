import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";

export default function EditClientModal(props) {
    const {
        open,
        onClose,
        formData,
        updateFormData,
        onEdit
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
                        Editar cliente
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
                            <TextField
                                label="Nome do Cliente *"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                placeholder="Escreva o nome do cliente"
                                value={formData.name}
                                onChange={(e) => updateFormData("name", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="E-mail do Cliente *"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                placeholder="Escreva o e-mail do cliente"
                                value={formData.email}
                                onChange={(e) => updateFormData("email", e.target.value)}
                            />
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
                        onClick={() => onEdit()}
                        sx={{
                            width: 100,
                            backgroundColor: "#0CA6BF",
                            color: "#FFFFFF",
                            "&:hover": {
                                backgroundColor: "#0098B2",
                            },
                        }}
                        disabled={!formData?.name || !formData?.email}
                    >
                        Salvar
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}