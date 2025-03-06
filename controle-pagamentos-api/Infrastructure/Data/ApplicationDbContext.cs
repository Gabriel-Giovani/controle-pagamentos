using controle_pagamentos_api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace controle_pagamentos_api.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) {}

        public DbSet<Client> Clients { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Client>().HasKey(c => c.Id);
            modelBuilder.Entity<Payment>().HasKey(c => c.Id);
        }
    }
}