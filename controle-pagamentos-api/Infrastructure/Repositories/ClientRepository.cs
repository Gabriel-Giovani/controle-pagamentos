using controle_pagamentos_api.Domain.Entities;
using controle_pagamentos_api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace controle_pagamentos_api.Infrastructure.Repositories
{
    public class ClientRepository
    {
        private readonly ApplicationDbContext _context;

        public ClientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Client> AddClientAsync(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return client;
        }

        public async Task<Client?> GetClientByIdAsync(int id)
        {
            return await _context.Clients.FindAsync(id);
        }

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client?> UpdateClientAync(int id, Client client)
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