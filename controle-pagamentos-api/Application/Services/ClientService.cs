using System.Runtime.CompilerServices;
using controle_pagamentos_api.Application.Interfaces;
using controle_pagamentos_api.Domain.Entities;
using controle_pagamentos_api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace controle_pagamentos_api.Application.Services
{
    public class ClientService : IClientService
    {
        private readonly ApplicationDbContext _context;

        public ClientService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Client> CreateClientAsync(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return client;
        }

        public async Task<Client?> GetClientByIdAsync(int id)
        {
            return await _context.Clients.FindAsync(id);
        }

        public async Task<(List<Client>, int)> GetAllClientsAsync(
            int? id,
            string? name,
            string? email,
            string? searchText,
            int pageNumber,
            int pageSize)
        {
            var query = _context.Clients.AsQueryable();

            if(id.HasValue)
            {
                query = query.Where(c => c.Id == id.Value);
            }

            if(!string.IsNullOrEmpty(name))
            {
                query = query.Where(c => EF.Functions.Like(c.Name, $"%{name}%"));
            }

            if(!string.IsNullOrEmpty(email))
            {
                query = query.Where(c => EF.Functions.Like(c.Email, $"%{email}%"));
            }

            if(!string.IsNullOrEmpty(searchText))
            {
                query = query.Where(c => EF.Functions.Like(c.Name, $"%{searchText}%"));
            }

            int totalClients = await query.CountAsync();

            int currentPage = pageNumber;

            if(pageNumber == 0) currentPage = 1;

            var clients = await query
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (clients, totalClients);
        }

        public async Task<Client?> UpdateClientAsync(int id, Client client)
        {
            var existingClient = await _context.Clients.FindAsync(id);

            if(existingClient == null) return null;

            existingClient.Name = client.Name;
            existingClient.Email = client.Email;

            await _context.SaveChangesAsync();

            return existingClient;
        }

        public async Task<bool> DeleteClientAsync(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if(client == null) return false;

            _context.Clients.Remove(client);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}