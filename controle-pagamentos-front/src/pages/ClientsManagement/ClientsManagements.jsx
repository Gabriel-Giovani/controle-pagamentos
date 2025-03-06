import { CellHeadText, CellRowText, Container, Header, HeaderTitle, HeaderTitleDescription, HeaderTitleText, TableHeader, TableHeaderTitle, TableHeaderTitleContainer } from "./styles";
import { Alert, Box, Button, Card, CircularProgress, IconButton, InputAdornment, patch, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FiltersRightMenu from "./components/FiltersRightMenu";
import { useEffect, useState } from "react";
import RemoveClientModal from "./components/RemoveClientModal";
import CreateClientModal from "./components/CreateClientModal";
import EditClientModal from "./components/EditClientModal";
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import { del, get, post, put } from "../../api/axios";
import useDebounce from "../../utils/debounce";

export default function ClientsManagement() {
    const initialFilterFormData = {
        id: "",
        name: "",
        email: ""
    };

    const initialCreateClientFormData = {
        name: "",
        email: ""
    };

    const initialEditClientFormData = {
        name: "",
        email: ""
    };

    const [isFilterRightMenuOpened, setIsFilterRightMenuOpened] = useState(false);
    const [filterFormData, setFilterFormData] = useState(initialFilterFormData);
    const [isRemoveClientModalOpened, setIsRemoveClientModalOpened] = useState(false);
    const [isCreateClientModalOpened, setIsCreateClientModalOpened] = useState(false);
    const [createClientFormData, setCreateClientFormData] = useState(initialCreateClientFormData);
    const [isEditClientModalOpened, setIsEditClientModalOpened] = useState(false);
    const [editClientFormData, setEditClientFormData] = useState(initialEditClientFormData);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isFeedbackOpened, setIsFeedbackOpened] = useState(false);
    const [feedbackSeverity, setFeedbackSeverity] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [totalClients, setTotalClients] = useState(0);
    const [isRequestLoading, setIsRequestLoading] = useState(false);

    const debouncedSearchText = useDebounce(searchText, 1000);

    useEffect(() => {
        getClients();
    }, []);

    useEffect(() => {
        getClients();
    }, [debouncedSearchText, currentPage, rowsPerPage]);

    function handleUpdateFilterFormData(key, value) {
        const newFormData = {...filterFormData};

        newFormData[key] = value;

        setFilterFormData({...newFormData});
    }

    function handleUpdateCreateClientFormData(key, value) {
        const newFormData = {...createClientFormData};

        newFormData[key] = value;

        setCreateClientFormData({...newFormData});
    }

    function handleUpdateEditClientFormData(key, value) {
        const newFormData = {...editClientFormData};

        newFormData[key] = value;

        setEditClientFormData({...newFormData});
    }

    function handleRenderingFeedback(message, severity) {
        setFeedbackMessage(message);
        setFeedbackSeverity(severity);
        setIsFeedbackOpened(true);
    }

    function handleDefineFilterParams() {
        return `${filterFormData?.id ? `&id=${filterFormData?.id}` : ""}${filterFormData?.name ? `&name=${filterFormData?.name}` : ""}${filterFormData?.email ? `&email=${filterFormData?.email}` : ""}&pageNumber=${currentPage}&pageSize=${rowsPerPage}`;
    }

    async function getClients() {
        try {
            setIsRequestLoading(true);

            const response = await get(`/clientes?searchText=${debouncedSearchText}${handleDefineFilterParams()}`);

            setClients(response?.data ?? []);
            setTotalClients(response?.totalClients ?? 0);
            setIsRequestLoading(false);
        } catch(e) {
            console.error(e);
            setIsRequestLoading(false);
        }
    }

    async function removeClient() {
        try {
            await del(`/clientes/${selectedClient?.id}`);

            await getClients();
            handleRenderingFeedback("Cliente removido com sucesso!", "success");
            setSelectedClient(null);
            setIsRemoveClientModalOpened(false);
        } catch(e) {
            console.error(e);
            handleRenderingFeedback("Falha ao remover cliente", "error");
        }
    }

    async function createClient() {
        try {
            await post("/clientes", createClientFormData);

            await getClients();
            handleRenderingFeedback("Cliente cadastrado com sucesso!", "success");
            setIsCreateClientModalOpened(false);
            setCreateClientFormData({...initialCreateClientFormData});
        } catch(e) {
            console.error(e);
            handleRenderingFeedback("Falha ao cadastrar cliente", "error");
        }
    }

    async function updateClient() {
        try {
            await put(`/clientes/${selectedClient?.id}`, editClientFormData);

            await getClients();
            handleRenderingFeedback("Cliente editado com sucesso!", "success");
            setIsEditClientModalOpened(false);
            setEditClientFormData({...initialEditClientFormData});
        } catch(e) {
            console.error(e);
            handleRenderingFeedback("Falha ao editar cliente", "error");
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

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    <HeaderTitleText>Gerenciar clientes</HeaderTitleText>
                    <HeaderTitleDescription>Veja todos os clientes cadastrados</HeaderTitleDescription>
                </HeaderTitle>

                <Button
                    variant="contained"
                    style={{ backgroundColor: "#0CA6BF" }}
                    onClick={() => setIsCreateClientModalOpened(true)}
                >
                    Cadastrar novo cliente
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
                            <HeaderTitleText>Lista de clientes</HeaderTitleText>
                            <HeaderTitleDescription>{totalClients} clientes cadastrados</HeaderTitleDescription>
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
                                    <CellHeadText>Nome</CellHeadText>
                                </TableCell>
                                <TableCell>
                                    <CellHeadText>E-mail</CellHeadText>
                                </TableCell>
                                <TableCell>
                                    <CellHeadText>Ações</CellHeadText>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                clients.map((client, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <CellRowText>{client?.id}</CellRowText>
                                        </TableCell>
                                        <TableCell>
                                            <CellRowText>{client?.name}</CellRowText>
                                        </TableCell>
                                        <TableCell>
                                            <CellRowText>{client?.email}</CellRowText>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => {
                                                setSelectedClient(client);
                                                setEditClientFormData({...client})
                                                setIsEditClientModalOpened(true);
                                            }}>
                                                <EditIcon style={{ color: "#0CA6BF" }} />
                                            </IconButton>

                                            <IconButton onClick={() => {
                                                setSelectedClient(client);
                                                setIsRemoveClientModalOpened(true);
                                            }}>
                                                <DeleteIcon style={{ color: "#D859E4" }} />
                                            </IconButton>
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
                    (clients?.length <= 0 && !isRequestLoading) && (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            width="100%"
                            style={{ backgroundColor: "#F4F6F8", padding: 24 }}
                        >
                            <HourglassDisabledIcon />
                            <p>Nenhum cliente encontrado</p>
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
                        count={totalClients}
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
                    await getClients();
                    setIsFilterRightMenuOpened(false);
                }}
            />

            <RemoveClientModal
                open={isRemoveClientModalOpened}
                onClose={() => {
                    setIsRemoveClientModalOpened(false);
                    setSelectedClient(null);
                }}
                onRemove={removeClient}
            />

            <CreateClientModal
                open={isCreateClientModalOpened}
                onClose={() => {
                    setIsCreateClientModalOpened(false);
                    setCreateClientFormData({...initialCreateClientFormData});
                }}
                formData={createClientFormData}
                updateFormData={handleUpdateCreateClientFormData}
                onCreate={createClient}
            />

            <EditClientModal
                open={isEditClientModalOpened}
                onClose={() => {
                    setIsEditClientModalOpened(false);
                    setEditClientFormData({...initialEditClientFormData});
                    setSelectedClient(null);
                }}
                formData={editClientFormData}
                updateFormData={handleUpdateEditClientFormData}
                onEdit={updateClient}
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