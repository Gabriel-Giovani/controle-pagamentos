import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';

export default function RemovePaymentModal(props) {
    const {
        open,
        onClose,
        onRemove
    } = props;

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            style={{ padding: 12 }}
        >
            <DialogTitle>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <p
                        style={{
                            color: "#3C3C3C",
                            fontWeight: "bold"
                        }}
                    >
                        Remover pagamento
                    </p>
                    <Box style={{ cursor: "pointer" }} onClick={() => onClose()}>
                        x
                    </Box>
                </Box>
            </DialogTitle>
            
            <DialogContent
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 400
                }}
            >
                <WarningIcon style={{ fontSize: 42, color: "#D859E4" }} />

                <p style={{ color: "#212B36", fontWeight: "bold" }}>Você realmente deseja remover este pagamento?</p>
                <p style={{ color: "#515151", fontSize: 14 }}>Esta ação não pode ser desfeita</p>
            </DialogContent>

            <DialogActions
                style={{
                    display: "flex",
                    padding: 10,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 16
                }}
            >
                <Button
                    variant="outlined"
                    onClick={() => onClose()}
                    sx={{
                        width: "100%",
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
                    onClick={() => onRemove()}
                    sx={{
                        width: "100%",
                        backgroundColor: "#0CA6BF",
                        color: "#FFFFFF",
                        "&:hover": {
                            backgroundColor: "#0098B2",
                        },
                    }}
                >
                    Remover
                </Button>
            </DialogActions>
        </Dialog>
    )
}