using controle_pagamentos_api.Domain.Entities;
using controle_pagamentos_api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace controle_pagamentos_api.Infrastructure.Repositories
{
    public class PaymentRepository
    {
        private readonly ApplicationDbContext _context;

        public PaymentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Payment> AddPaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<Payment?> GetPaymentByIdAsync(int id)
        {
            return await _context.Payments.FindAsync(id);
        }

        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _context.Payments.ToListAsync();
        }

        public async Task<Payment?> UpdatePaymentAsync(int id, Payment payment)
        {
            var existingPayment = await _context.Payments.FindAsync(id);

            if(existingPayment == null) return null;

            _context.Payments.Update(payment);

            await _context.SaveChangesAsync();

            return existingPayment;
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