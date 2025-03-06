using System.ComponentModel.DataAnnotations;

namespace controle_pagamentos_api.Domain.Entities
{
    public class Client
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public List<Payment> Payments { get; set; } = new List<Payment>();

        public void ValidateEmail()
        {
            if (string.IsNullOrEmpty(Email))
                throw new InvalidOperationException("O email não pode ser vazio.");
        }

        public void ValidateName()
        {
            if (string.IsNullOrEmpty(Name))
                throw new InvalidOperationException("O nome não pode ser vazio.");
        }

        public void UpdateClientDetails(string newName, string newEmail)
        {
            Name = newName;
            Email = newEmail;

            // Valida as mudanças
            ValidateName();
            ValidateEmail();
        }
    }
}