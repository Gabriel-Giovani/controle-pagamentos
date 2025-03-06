using controle_pagamentos_api.Application.dto;
using controle_pagamentos_api.Application.Interfaces;
using controle_pagamentos_api.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace controle_pagamentos_api.API.Controllers
{
    [Route("api/pagamentos")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IClientService _clientService;

        public PaymentController(
            IPaymentService paymentService,
            IClientService clientService)
        {
            _paymentService = paymentService;
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments(
            [FromQuery] string? searchText,
            [FromQuery] int? id,
            [FromQuery] string? clientName,
            [FromQuery] DateTime? date,
            [FromQuery] string? status,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 25)
        {
            var (payments, totalPayments) = await _paymentService.GetAllPaymentsAsync(id, clientName, date, status, searchText, pageNumber, pageSize);

            var response = new
            {
                TotalPayments = totalPayments,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalPayments / pageSize),
                Data = payments
            };

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);

            if (payment == null) return NotFound();

            return Ok(payment);
        }

        [HttpPost]
        public async Task<ActionResult<PaymentDTO>> CreatePayment([FromBody] Payment payment)
        {
            var client = await _clientService.GetClientByIdAsync(payment.ClientId);

            if(client == null) return BadRequest("Client not found!");

            payment.Client = client;

            var createdPayment = await _paymentService.CreatePaymentAsync(payment);

            return CreatedAtAction(nameof(GetPayment), new { id = createdPayment.Id }, createdPayment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, Payment payment)
        {
            if (id != payment.Id) return BadRequest();

            var updatedPayment = await _paymentService.UpdatePaymentAsync(id, payment);

            if (updatedPayment == null) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);

            if (payment == null) return NotFound();

            await _paymentService.DeletePaymentAsync(id);

            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] UpdatePaymentStatusDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Status)) return BadRequest("O status não pode estar vazio.");

            var updatedPayment = await _paymentService.UpdatePaymentStatusAsync(id, dto.Status);

            if (updatedPayment == null) return NotFound("Pagamento não encontrado.");

            return Ok(updatedPayment);
        }
    }
}