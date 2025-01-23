using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HealthBro_BackEnd.Models;

public partial class HealthbroContext : DbContext
{
    public HealthbroContext()
    {
    }

    public HealthbroContext(DbContextOptions<HealthbroContext> options) : base(options)
    {
    }

    public virtual DbSet<Exercise> Exercises { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Planexercise> Planexercises { get; set; }

    public virtual DbSet<User> Users { get; set; }

  

    public virtual DbSet<Workoutplan> Workoutplans { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=healthbro;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Exercise>(entity =>
        {
            entity.HasKey(e => e.ExerciseId).HasName("PRIMARY");

            entity.ToTable("exercises");

            entity.Property(e => e.ExerciseId)
                .HasColumnType("int(11)")
                .HasColumnName("ExerciseID");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text");
            entity.Property(e => e.MuscleGroup).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("permission");

            entity.HasIndex(e => e.Name, "Nev").IsUnique();

            entity.HasIndex(e => e.Level, "Szint").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Description).HasMaxLength(100);
            entity.Property(e => e.Level).HasColumnType("int(1)");
            entity.Property(e => e.Name).HasMaxLength(32);
        });

        modelBuilder.Entity<Planexercise>(entity =>
        {
            entity.HasKey(e => e.PlanExerciseId).HasName("PRIMARY");

            entity.ToTable("planexercises");

            entity.HasIndex(e => e.ExerciseId, "ExerciseID");

            entity.HasIndex(e => e.PlanId, "PlanID");

            entity.Property(e => e.PlanExerciseId)
                .HasColumnType("int(11)")
                .HasColumnName("PlanExerciseID");
            entity.Property(e => e.ExerciseId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("ExerciseID");
            entity.Property(e => e.PlanId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("PlanID");
            entity.Property(e => e.Reps).HasColumnType("int(11)");
            entity.Property(e => e.Weight).HasColumnType("int(11)");
            entity.Property(e => e.Sets).HasColumnType("int(11)");

            entity.HasOne(d => d.Exercise).WithMany(p => p.Planexercises)
                .HasForeignKey(d => d.ExerciseId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("planexercises_ibfk_2");

            entity.HasOne(d => d.Plan).WithMany(p => p.Planexercises)
                .HasForeignKey(d => d.PlanId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("planexercises_ibfk_1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.PermissionId, "Jog");

            entity.HasIndex(e => e.LoginName, "LoginNev").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Email).HasMaxLength(64);
            entity.Property(e => e.Hash)
                .HasMaxLength(64)
                .HasColumnName("HASH");
            entity.Property(e => e.LoginName).HasMaxLength(16);
            entity.Property(e => e.Name).HasMaxLength(64);
            entity.Property(e => e.PermissionId).HasColumnType("int(11)");
            entity.Property(e => e.ProfilePicturePath).HasMaxLength(64);
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .HasColumnName("SALT");

            entity.HasOne(d => d.Permission).WithMany(p => p.Users)
                .HasForeignKey(d => d.PermissionId)
                .HasConstraintName("user_ibfk_1");
        });

       

        modelBuilder.Entity<Workoutplan>(entity =>
        {
            entity.HasKey(e => e.PlanId).HasName("PRIMARY");

            entity.ToTable("workoutplans");

            entity.HasIndex(e => e.UserId, "UserID");

            entity.Property(e => e.PlanId)
                .HasColumnType("int(11)")
                .HasColumnName("PlanID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("datetime");
            entity.Property(e => e.PlanName)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'");
            entity.Property(e => e.UserId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Workoutplans)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("workoutplans_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
