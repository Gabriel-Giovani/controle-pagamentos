namespace controle_pagamentos_api.Application.dto
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }
}