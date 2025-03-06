using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace controle_pagamentos_api.Domain.Entities
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ClientId { get; set; }

        [ForeignKey("ClientId")]
        public Client? Client { get; set; }

        [Required]
        public decimal Value { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Status { get; set; } = "PENDENTE";

        public void UpdateStatus(string newStatus)
        {
            var validStatuses = new List<string> { "PENDENTE", "PAGO", "CANCELADO" };

            if (!validStatuses.Contains(newStatus)) throw new InvalidOperationException("Status inválido.");

            if (Status == "PAGO" || Status == "CANCELADO")
                throw new InvalidOperationException("Não é possível reverter um pagamento já pago ou cancelado.");

            Status = newStatus;
        }
    }
}