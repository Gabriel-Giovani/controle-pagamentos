using controle_pagamentos_api.Domain.Entities;

namespace controle_pagamentos_api.Tests
{
    public class PaymentTests
    {
        // Testa se o pagamento tem o status inicial PENDENTE quando é criado
        [Fact]
        public void Payment_Should_Have_Initial_Status_As_Pendente()
        {
            // Arrange & Act
            var payment = new Payment
            {
                Id = 1,
                ClientId = 1,
                Value = 100,
                Date = DateTime.Now
            };

            // Assert
            Assert.Equal("PENDENTE", payment.Status);
        }

        // Testa se o status do pagamento pode ser alterado de PENDENTE para PAGO
        [Fact]
        public void Payment_Should_Change_Status_From_Pendente_To_Pago()
        {
            // Arrange
            var payment = new Payment
            {
                Id = 1,
                ClientId = 1,
                Value = 100,
                Date = DateTime.Now
            };

            // Act
            payment.UpdateStatus("PAGO");

            // Assert
            Assert.Equal("PAGO", payment.Status);
        }

        // Testa se o status do pagamento pode ser alterado de PENDENTE para CANCELADO
        [Fact]
        public void Payment_Should_Change_Status_From_Pendente_To_Cancelado()
        {
            // Arrange
            var payment = new Payment
            {
                Id = 1,
                ClientId = 1,
                Value = 100,
                Date = DateTime.Now
            };

            // Act
            payment.UpdateStatus("CANCELADO");

            // Assert
            Assert.Equal("CANCELADO", payment.Status);
        }

        // Testa se uma exception é lançada quando é tentado definir um status inválido
        [Fact]
        public void Payment_Should_Throw_Exception_For_Invalid_Status()
        {
            // Arrange
            var payment = new Payment
            {
                Id = 1,
                ClientId = 1,
                Value = 100,
                Date = DateTime.Now
            };

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => payment.UpdateStatus("EM_PROCESSAMENTO"));
            Assert.Equal("Status inválido.", exception.Message);
        }

        // Testa se uma exceção é lançada quando tentamos alterar o status de um pagamento CANCELADO
        [Fact]
        public async Task UpdatePaymentStatusAsync_ShouldThrowException_WhenPaymentIsCanceled()
        {
            // Arrange
            var payment = new Payment
            {
                Id = 1,
                ClientId = 1,
                Value = 100,
                Date = DateTime.Now,
                Status = "CANCELADO"
            };

            var exception = Assert.Throws<InvalidOperationException>(() => payment.UpdateStatus("PENDENTE"));
            Assert.Equal("Não é possível reverter um pagamento já pago ou cancelado.", exception.Message);
        }

        // Testa se uma exceção é lançada quando tentamos alterar o status de um pagamento PAGO
        [Fact]
        public async Task UpdatePaymentStatusAsync_ShouldThrowException_WhenPaymentIsPaid()
        {
            // Arrange
            var payment = new Payment
            {
                Id = 1,
                ClientId = 1,
                Value = 100,
                Date = DateTime.Now,
                Status = "PAGO"
            };

            var exception = Assert.Throws<InvalidOperationException>(() => payment.UpdateStatus("PENDENTE"));
            Assert.Equal("Não é possível reverter um pagamento já pago ou cancelado.", exception.Message);
        }

    }
}