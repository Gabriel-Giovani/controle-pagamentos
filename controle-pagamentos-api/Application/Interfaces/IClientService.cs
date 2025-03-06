using controle_pagamentos_api.Domain.Entities;

namespace controle_pagamentos_api.Application.Interfaces
{
    public interface IClientService
    {
        Task<Client> CreateClientAsync(Client client);
        Task<Client?> GetClientByIdAsync(int id);
        Task<(List<Client>, int)> GetAllClientsAsync(int? id, string? name, string? email, string? searchText, int pageNumber, int pageSize);
        Task<Client?> UpdateClientAsync(int id, Client client);
        Task<bool> DeleteClientAsync(int id);
    }
}