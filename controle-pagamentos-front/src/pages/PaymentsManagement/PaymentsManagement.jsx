import { Alert, Box, Button, Card, Chip, CircularProgress, IconButton, InputAdornment, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { CellHeadText, CellRowText, Container, Header, HeaderTitle, HeaderTitleDescription, HeaderTitleText, TableHeader, TableHeaderTitle, TableHeaderTitleContainer } from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { del, get, post, put } from "../../api/axios";
import moment from "moment";
import useDebounce from "../../utils/debounce";
import RemovePaymentModal from "./RemovePaymentModal";
import CreatePaymentModal from "./CreatePaymentModal";
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import FiltersRightMenu from "./FiltersRightMenu";

export default function PaymentsManagemnt() {
    const initialCreatePaymentFormData = {
        client: undefined,
        value: 0,
        date: undefined,
    };

    const initialFilterFormData = {
        id: "",
        clientName: "",
        date: undefined,
        status: undefined
    };

    const [payments, setPayments] = useState([]);
    const [totalPayments, setTotalPayments] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [isFeedbackOpened, setIsFeedbackOpened] = useState(false);
    const [feedbackSeverity, setFeedbackSeverity] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isRemovePaymentModalOpened, setIsRemovePaymentModalOpened] = useState(false);
    const [createPaymentFormData, setCreatepaymentFormData] = useState(initialCreatePaymentFormData);
    const [isCreatePaymentModalOpened, setIsCreatePaymentModalOpened] = useState(false);
    const [clients, setClients] = useState([]);
    const [isRequestLoading, setIsRequestLoading] = useState(false);
    const [isFilterRightMenuOpened, setIsFilterRightMenuOpened] = useState(false);
    const [filterFormData, setFilterFormData] = useState(initialFilterFormData);

    const debouncedSearchText = useDebounce(searchText, 1000);

    useEffect(() => {
        getPayments();
        getClients();
    }, []);

    useEffect(() => {
        getPayments();
    }, [debouncedSearchText, currentPage, rowsPerPage]);

    function handleDefineFilterParams() {
        return `${filterFormData?.id ? `&id=${filterFormData?.id}` : ""}${filterFormData?.clientName ? `&clientName=${filterFormData?.clientName}` : ""}${filterFormData?.date ? `&date=${moment(filterFormData?.date?.toDate()).format("YYYY-MM-DDTHH:mm:ss")}` : ""}${filterFormData?.status ? `&status=${filterFormData?.status?.status}` : ""}&pageNumber=${currentPage}&pageSize=${rowsPerPage}`;
    }

    async function getClients() {
        try {
            const response = await get(`/clientes`);

            setClients(response?.data ?? []);
        } catch(e) {
            console.error(e);
        }
    }

    async function getPayments() {
        try {
            setIsRequestLoading(true);

            const response = await get(`/pagamentos?searchText=${debouncedSearchText}${handleDefineFilterParams()}`);

            setPayments(response?.data ?? []);
            setTotalPayments(response?.totalPayments ?? 0);
            setIsRequestLoading(false);
        } catch(e) {
            console.error(e);
            setIsRequestLoading(false);
        }
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);
    }

    function handleRenderingStatusText(status) {
        switch(status) {
            case "PENDENTE":
                return (
                    <Chip
                        label="Pendente"
                        style={{ backgroundColor: "#F8BB13" }}
                    />
                );

            case "PAGO":
                return (
                    <Chip
                        label="Pago"
                        style={{ backgroundColor: "#48CA93" }}
                    />
                );

            case "CANCELADO":
                return (
                    <Chip
                        label="Cancelado"
                        style={{ backgroundColor: "#D859E4" }}
                    />
                );
        }
    }

    function handleChangePage(_, newPage) {
        setRowsPerPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
    }

    function handleRenderingFeedback(message, severity) {
        setFeedbackMessage(message);
        setFeedbackSeverity(severity);
        setIsFeedbackOpened(true);
    }

    async function handleRemovePayment() {
        try {
            await del(`/pagamentos/${selectedPayment?.id}`);

            await getPayments();
            handleRenderingFeedback("Pagamento removido com sucesso!");
            setSelectedPayment(null);
            setIsRemovePaymentModalOpened(false);
        } catch(e) {
            console.error(e);
            handleRenderingFeedback("Falha ao remover pagamento");
        }
    }

    function handleUpdateCreatePaymentFormData(key, value) {
        const newFormData = {...createPaymentFormData};

        newFormData[key] = value;

        setCreatepaymentFormData({...newFormData});
    }

    function handleUpdateFilterFormData(key, value) {
        const newFormData = {...filterFormData};

        newFormData[key] = value;

        setFilterFormData({...newFormData});
    }

    async function handleCreatePayment() {
        try {
            const reqObject = {
                clientId: createPaymentFormData?.client?.id,
                value: createPaymentFormData?.value,
                date: moment(createPaymentFormData?.date?.toDate()).format("YYYY-MM-DDTHH:mm:ss"),
                status: "PENDENTE"
            };

            await post("/pagamentos", reqObject);

            await getPayments();
            handleRenderingFeedback("Pagamento criado com sucesso!", "success");
            setIsCreatePaymentModalOpened(false);
        } catch(e) {
            console.error(e);
            handleRenderingFeedback("Falha ao criar pagamento", "error");
        }
    }

    async function handleChangePaymentStatus(payment, status) {
        try {
            await put(`/pagamentos/${payment?.id}/status`, { status });

            await getPayments();
            handleRenderingFeedback("Status do pagamento alterado com sucesso!", "success");
        } catch(e) {
            console.error(e);
            handleRenderingFeedback("Falha ao alterar status do pagamento", "error");
        }
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    <HeaderTitleText>Gerenciar pagamentos</HeaderTitleText>
                    <HeaderTitleDescription>Veja todos os pagamentos cadastrados</HeaderTitleDescription>
                </HeaderTitle>

                <Button
                    variant="contained"
                    style={{ backgroundColor: "#0CA6BF" }}
                    onClick={() => setIsCreatePaymentModalOpened(true)}
                >
                    Cadastrar novo pagamento
                </Button>
            </Header>

            <Card
                sx={{
                    background: "#FFF",
                    boxShadow: "0px 12px 24px -4px #919EAB33",
                    marginBottom: 4,
                    mt: 5,
                    p: 4,
                }}
            >
                <TableHeader>
                    <TableHeaderTitleContainer>
                        <TableHeaderTitle>
                            <HeaderTitleText>Lista de pagamentos</HeaderTitleText>
                            <HeaderTitleDescription>{totalPayments} pagamentos cadastrados</HeaderTitleDescription>
                        </TableHeaderTitle>

                        <TextField
                            placeholder="Pesquise pelo nome do cliente"
                            variant="outlined"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 500 }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1,
                                    height: 40,
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#E0E0E0",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#0CA6BF",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon className="text-[#919EAB]" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#0CA6BF" }}
                            onClick={() => setIsFilterRightMenuOpened(true)}
                        >
                            Filtrar
                        </Button>
                    </TableHeaderTitleContainer>
                </TableHeader>

                <TableContainer sx={{ maxWidth: "100%", mt: 5 }}>
                    <Table>
                        <TableHead style={{ backgroundColor: "#F4F6F8" }}>
                            <TableRow>
                                <TableCell>
                                    <CellHeadText>ID</CellHeadText>
                                </TableCell>
                                <TableCell>
                                    <CellHeadText>Nome do Cliente</CellHeadText>
                                </TableCell>
                                <TableCell>
                                    <CellHeadText>Valor</CellHeadText>
                                </TableCell>
                                <TableCell>
                                    <CellHeadText>Data</CellHeadText>
                                </TableCell>
                                <TableCell>
                                    <CellHeadText>Status</CellHeadText>
                                </TableCell>
                                <TableCell>
                                    <CellHeadText>Ações</CellHeadText>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                payments?.map((payment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <CellRowText>{payment.id}</CellRowText>
                                        </TableCell>
                                        <TableCell>
                                            <CellRowText>{payment?.clientName ?? ""}</CellRowText>
                                        </TableCell>
                                        <TableCell>
                                            <CellRowText>{formatCurrency(payment?.value ?? 0)}</CellRowText>
                                        </TableCell>
                                        <TableCell>
                                            <CellRowText>{moment(payment?.date ?? new Date).format("DD/MM/YYYY")}</CellRowText>
                                        </TableCell>
                                        <TableCell>
                                            {handleRenderingStatusText(payment.status)}
                                        </TableCell>
                                        <TableCell>
                                            <div
                                                style={{ display: "flex", gap: "4px" }}
                                            >
                                                <IconButton onClick={() => {
                                                    setSelectedPayment(payment);
                                                    setIsRemovePaymentModalOpened(true);
                                                }}>
                                                    <DeleteIcon style={{ color: "#D859E4" }} />
                                                </IconButton>
                                                
                                                {
                                                    payment.status === "PENDENTE" && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                style={{ backgroundColor: "#0CA6BF" }}
                                                                onClick={() => handleChangePaymentStatus(payment, "PAGO")}
                                                            >
                                                                Marcar como Pago
                                                            </Button>

                                                            <Button
                                                                variant="contained"
                                                                style={{ backgroundColor: "#D859E4" }}
                                                                onClick={() => handleChangePaymentStatus(payment, "CANCELADO")}
                                                            >
                                                                Cancelar
                                                            </Button>
                                                        </>
                                                    )
                                                }
                                                
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                {
                    isRequestLoading && (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                            style={{ backgroundColor: "#F4F6F8", padding: 24 }}
                        >
                            <CircularProgress />
                        </Box>
                    )
                }

                {
                    (payments?.length <= 0 && !isRequestLoading) && (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            width="100%"
                            style={{ backgroundColor: "#F4F6F8", padding: 24 }}
                        >
                            <HourglassDisabledIcon />
                            <p>Nenhum pagamento encontrado</p>
                        </Box>
                    )
                }

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    padding={2}
                >
                    <TablePagination
                        component="div"
                        count={totalPayments}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[25, 50, 100]}
                        labelRowsPerPage="Linhas por página:"
                        labelDisplayedRows={({ from, to, count }) => 
                            `${from}-${to} de ${count}`
                        }
                        sx={{
                            "& .MuiTablePagination-toolbar": { padding: 0 },
                            "& .MuiTablePagination-actions": { marginLeft: 0 },
                            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                                {
                                fontSize: "0.875rem",
                                color: "#212B36",
                                },
                            "& .MuiTablePagination-select": {
                                fontSize: "0.875rem",
                                color: "#212B36",
                            },
                        }}
                    />
                </Box>
            </Card>

            <RemovePaymentModal
                open={isRemovePaymentModalOpened}
                onClose={() => {
                    setIsRemovePaymentModalOpened(false);
                    setSelectedPayment(null);
                }}
                onRemove={handleRemovePayment}
            />

            <CreatePaymentModal
                open={isCreatePaymentModalOpened}
                onClose={() => {
                    setIsCreatePaymentModalOpened(false);
                    setCreatepaymentFormData({...initialCreatePaymentFormData});
                }}
                formData={createPaymentFormData}
                updateFormData={handleUpdateCreatePaymentFormData}
                clients={clients}
                onCreate={handleCreatePayment}
            />

            <FiltersRightMenu
                open={isFilterRightMenuOpened}
                onClose={() => {
                    setIsFilterRightMenuOpened(false);
                    setFilterFormData({...initialFilterFormData});
                }}
                formData={filterFormData}
                onUpdateFormData={handleUpdateFilterFormData}
                onClearFilters={() => setFilterFormData({...initialFilterFormData})}
                onApplyFilters={async () => {
                    await getPayments();
                    setIsFilterRightMenuOpened(false);
                }}
            />

            <Snackbar
                open={isFeedbackOpened}
                autoHideDuration={6000}
                onClose={() => setIsFeedbackOpened(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setIsFeedbackOpened(false)}
                    severity={feedbackSeverity}
                    sx={{ width: "100%" }}
                >
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}