using controle_pagamentos_api.Application.Interfaces;
using controle_pagamentos_api.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace controle_pagamentos_api.API.Controllers
{
    [Route("api/clientes")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients(
            [FromQuery] string? searchText,
            [FromQuery] int? id,
            [FromQuery] string? name,
            [FromQuery] string? email,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 25)
        {
            var (clients, totalClients) = await _clientService.GetAllClientsAsync(id, name, email, searchText, pageNumber, pageSize);

            var response = new
            {
                TotalClients = totalClients,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalClients / pageSize),
                Data = clients
            };

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _clientService.GetClientByIdAsync(id);

            if (client == null) return NotFound();

            return Ok(client);
        }

        [HttpPost]
        public async Task<ActionResult<Client>> CreateClient(Client client)
        {
            var createdClient = await _clientService.CreateClientAsync(client);

            return CreatedAtAction(nameof(GetClient), new { id = createdClient.Id }, createdClient);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, Client client)
        {
            if (id != client.Id) return BadRequest();

            var updatedClient = await _clientService.UpdateClientAsync(id, client);

            if (updatedClient == null) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _clientService.GetClientByIdAsync(id);

            if (client == null) return NotFound();

            await _clientService.DeleteClientAsync(id);

            return NoContent();
        }
    }
}