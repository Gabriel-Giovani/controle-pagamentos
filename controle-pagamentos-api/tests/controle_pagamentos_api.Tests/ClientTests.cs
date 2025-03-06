using controle_pagamentos_api.Domain.Entities;

namespace controle_pagamentos_api.Tests
{
    public class ClientTests
    {
        // Testa se um cliente é criado com um nome e email válidos
        [Fact]
        public void Client_Should_Have_Valid_Name_And_Email()
        {
            // Arrange
            var client = new Client
            {
                Id = 1,
                Name = "João Silva",
                Email = "joao.silva@example.com"
            };

            // Assert
            Assert.Equal("João Silva", client.Name);
            Assert.Equal("joao.silva@example.com", client.Email);
        }

        // Testa se um cliente não pode ser criado com um email vazio
        [Fact]
        public void Client_Should_Throw_Exception_When_Email_Is_Empty()
        {
            // Arrange
            var client = new Client
            {
                Id = 1,
                Name = "João Silva",
                Email = string.Empty
            };

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => client.ValidateEmail());
            Assert.Equal("O email não pode ser vazio.", exception.Message);
        }

        // Testa se o nome de um cliente não pode ser vazio
        [Fact]
        public void Client_Should_Throw_Exception_When_Name_Is_Empty()
        {
            // Arrange
            var client = new Client
            {
                Id = 1,
                Name = string.Empty,
                Email = "joao.silva@example.com"
            };

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => client.ValidateName());
            Assert.Equal("O nome não pode ser vazio.", exception.Message);
        }

        // Testa se o cliente pode ser atualizado com um novo nome e email válidos
        [Fact]
        public void Client_Should_Change_Name_And_Email()
        {
            // Arrange:
            var client = new Client
            {
                Id = 1,
                Name = "João Silva",
                Email = "joao.silva@example.com"
            };

            // Act
            client.UpdateClientDetails("Maria Silva", "maria.silva@example.com");

            // Assert
            Assert.Equal("Maria Silva", client.Name);
            Assert.Equal("maria.silva@example.com", client.Email);
        }
    }
}