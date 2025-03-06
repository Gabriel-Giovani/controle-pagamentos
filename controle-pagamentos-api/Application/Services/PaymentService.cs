using controle_pagamentos_api.Application.dto;
using controle_pagamentos_api.Application.Interfaces;
using controle_pagamentos_api.Domain.Entities;
using controle_pagamentos_api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace controle_pagamentos_api.Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ApplicationDbContext _context;

        public PaymentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PaymentDTO> CreatePaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            var createdPayment = await _context.Payments
                .Include(p => p.Client)
                .FirstOrDefaultAsync(p => p.Id == payment.Id);

            if(createdPayment == null) throw new Exception("Erro ao criar pagamento");

            return new PaymentDTO
            {
                Id = createdPayment.Id,
                Value = createdPayment.Value,
                Date = createdPayment.Date,
                Status = createdPayment.Status,
                ClientId = createdPayment.ClientId,
                ClientName = createdPayment.Client?.Name
            };
        }

        public async Task<Payment?> GetPaymentByIdAsync(int id)
        {
            return await _context.Payments.FindAsync(id);
        }

        public async Task<(List<PaymentDTO>, int)> GetAllPaymentsAsync(
            int? id,
            string? clientName,
            DateTime? date,
            string? status,
            string? searchText,
            int pageNumber,
            int pageSize)
        {
            var query = _context.Payments
                .Include(p => p.Client)
                .AsQueryable();

            if(id.HasValue)
            {
                query = query.Where(p => p.Id == id.Value);
            }

            if(!string.IsNullOrEmpty(clientName))
            {
                query = query.Where(p => EF.Functions.Like(p.Client.Name, $"%{clientName}%"));
            }

            if(date.HasValue)
            {
                query = query.Where(p => p.Date == date.Value);
            }

            if(!string.IsNullOrEmpty(status))
            {
                query = query.Where(p => p.Status.ToLower() == status.ToLower());
            }

            if(!string.IsNullOrEmpty(searchText))
            {
                query = query.Where(p => EF.Functions.Like(p.Client.Name, $"%{searchText}%"));
            }

            int totalPayments = await query.CountAsync();

            int currentPage = pageNumber;

            if(pageNumber == 0) currentPage = 1;

            var payments = await query
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PaymentDTO
                {
                    Id = p.Id,
                    ClientId = p.ClientId,
                    ClientName = p.Client.Name,
                    Value = p.Value,
                    Date = p.Date,
                    Status = p.Status
                })
                .ToListAsync();

            return (payments, totalPayments);
        }

        public async Task<Payment?> UpdatePaymentAsync(int id, Payment payment)
        {
            var existingPayment = await _context.Payments.FindAsync(id);

            if(existingPayment == null) return null;

            _context.Payments.Update(payment);

            await _context.SaveChangesAsync();

            return existingPayment;
        }

        public async Task<PaymentDTO?> UpdatePaymentStatusAsync(int paymentId, string newStatus)
        {
            var payment = await _context.Payments
                .Include(p => p.Client)
                .FirstOrDefaultAsync(p => p.Id == paymentId);

            if (payment == null) return null;

            payment.UpdateStatus(newStatus);
            await _context.SaveChangesAsync();

            return new PaymentDTO
            {
                Id = payment.Id,
                Value = payment.Value,
                Date = payment.Date,
                Status = payment.Status,
                ClientId = payment.ClientId,
                ClientName = payment.Client?.Name ?? "Desconhecido"
            };
        }

        public async Task<bool> DeletePaymentAsync(int id)
        {
            var existingPayment = await _context.Payments.FindAsync(id);

            if(existingPayment == null) return false;

            _context.Payments.Remove(existingPayment);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}