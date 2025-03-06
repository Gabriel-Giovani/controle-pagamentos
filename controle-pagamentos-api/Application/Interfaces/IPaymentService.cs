using controle_pagamentos_api.Application.dto;
using controle_pagamentos_api.Domain.Entities;

namespace controle_pagamentos_api.Application.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentDTO> CreatePaymentAsync(Payment payment);
        Task<Payment?> GetPaymentByIdAsync(int id);
        Task<(List<PaymentDTO>, int)> GetAllPaymentsAsync(int? id, string? clientName, DateTime? date, string? status, string? searchText, int pageNumber, int pageSize);
        Task<Payment?> UpdatePaymentAsync(int id, Payment payment);
        Task<bool> DeletePaymentAsync(int id);

        Task<PaymentDTO?> UpdatePaymentStatusAsync(int paymentId, string newStatus);
    }
}