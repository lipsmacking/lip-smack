USE [master]
GO

/****** Object:  Database [LipSmacking]    Script Date: 11/5/2016 12:24:51 PM ******/
IF EXISTS(SELECT * FROM SYS.DATABASES WHERE NAME='LipSmacking')
DROP DATABASE [LipSmacking]
GO
 
CREATE DATABASE [LipSmacking]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LipSmacking', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\LipSmacking.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'LipSmacking_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\LipSmacking_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO

ALTER DATABASE [LipSmacking] SET COMPATIBILITY_LEVEL = 130
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [LipSmacking].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [LipSmacking] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [LipSmacking] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [LipSmacking] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [LipSmacking] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [LipSmacking] SET ARITHABORT OFF 
GO

ALTER DATABASE [LipSmacking] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [LipSmacking] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [LipSmacking] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [LipSmacking] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [LipSmacking] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [LipSmacking] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [LipSmacking] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [LipSmacking] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [LipSmacking] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [LipSmacking] SET  DISABLE_BROKER 
GO

ALTER DATABASE [LipSmacking] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [LipSmacking] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [LipSmacking] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [LipSmacking] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [LipSmacking] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [LipSmacking] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [LipSmacking] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [LipSmacking] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [LipSmacking] SET  MULTI_USER 
GO

ALTER DATABASE [LipSmacking] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [LipSmacking] SET DB_CHAINING OFF 
GO

ALTER DATABASE [LipSmacking] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [LipSmacking] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [LipSmacking] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [LipSmacking] SET QUERY_STORE = OFF
GO

USE [LipSmacking]
GO

ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO

ALTER DATABASE [LipSmacking] SET  READ_WRITE 
GO



-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 11/04/2016 20:48:43
-- Generated from EDMX file: C:\Users\shrut\OneDrive\Documents\Visual Studio 2015\Projects\RestaurantPOC1\RestaurantPOC1\RestaurantEDM.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [LipSmacking];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

--IF OBJECT_ID(N'[dbo].[FK_QuantityInventory]', 'F') IS NOT NULL
--    ALTER TABLE [dbo].[Inventories] DROP CONSTRAINT [FK_QuantityInventory];
--GO
--IF OBJECT_ID(N'[dbo].[FK_RoleEmployees]', 'F') IS NOT NULL
--    ALTER TABLE [dbo].[Employees] DROP CONSTRAINT [FK_RoleEmployees];
--GO



-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

--IF OBJECT_ID(N'[dbo].[Customers]', 'U') IS NOT NULL
--    DROP TABLE [dbo].[Customers];
--GO
--IF OBJECT_ID(N'[dbo].[Employees]', 'U') IS NOT NULL
--    DROP TABLE [dbo].[Employees];
--GO
--IF OBJECT_ID(N'[dbo].[Inventories]', 'U') IS NOT NULL
--    DROP TABLE [dbo].[Inventories];
--GO
--IF OBJECT_ID(N'[dbo].[Menus]', 'U') IS NOT NULL
--    DROP TABLE [dbo].[Menus];
--GO
--IF OBJECT_ID(N'[dbo].[Quantities]', 'U') IS NOT NULL
--    DROP TABLE [dbo].[Quantities];
--GO
--IF OBJECT_ID(N'[dbo].[Roles]', 'U') IS NOT NULL
--    DROP TABLE [dbo].[Roles];
--GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Menus'
CREATE TABLE [dbo].[Menus] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ItemName] nvarchar(50)  NOT NULL,
    [IsEnabled] bit  NOT NULL
);
GO

-- Creating table 'Inventories'
CREATE TABLE [dbo].[Inventories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [QuantityRemaining] decimal(18,0)  NOT NULL,
    [Quantity_Id] int  NOT NULL
);
GO

-- Creating table 'Quantities'
CREATE TABLE [dbo].[Quantities] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'Employees1'
CREATE TABLE [dbo].[Employees] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FirstName] nvarchar(max)  NOT NULL,
    [LastName] nvarchar(max)  NOT NULL,
    [Role_Id] int  NOT NULL
);
GO

-- Creating table 'Roles'
CREATE TABLE [dbo].[Roles] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(20)  NOT NULL
);
GO

-- Creating table 'Customers'
CREATE TABLE [dbo].[Customers] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FirstName] varchar(45)  NULL,
    [LastName] varchar(45)  NULL,
    [EmailId] varchar(50)  NULL,
    [DateOfBirth] datetime  NULL
);
GO

-- Creating table 'Tables'
CREATE TABLE [dbo].[Tables] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [TableNumber] int  NOT NULL,
    [IsEnabled] bit  NOT NULL,
    [TableStatus] varchar(20)  NOT NULL    
);
GO

-- Creating table 'Orders'
CREATE TABLE [dbo].[Orders] (
    [Id] int IDENTITY(1,1) NOT NULL,
	[OrderCustomization] varchar(20),
    [OrderStatus] varchar(20)  NOT NULL,
    [TableAssignment_Id] int  NOT NULL,
	[Menu_Id] int NOT NULL,
	[Quantity] int NOT NULL
);
GO

-- Creating table 'TableAssignments'
CREATE TABLE [dbo].[TableAssignments] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Employee_Id] int  NOT NULL,
	[Customer_Id] int  NOT NULL,
	[Table_Id] int NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Menus'
ALTER TABLE [dbo].[Menus]
ADD CONSTRAINT [PK_Menus]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Inventories'
ALTER TABLE [dbo].[Inventories]
ADD CONSTRAINT [PK_Inventories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Quantities'
ALTER TABLE [dbo].[Quantities]
ADD CONSTRAINT [PK_Quantities]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Employees1'
ALTER TABLE [dbo].[Employees]
ADD CONSTRAINT [PK_Employees]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Roles'
ALTER TABLE [dbo].[Roles]
ADD CONSTRAINT [PK_Roles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Customers'
ALTER TABLE [dbo].[Customers]
ADD CONSTRAINT [PK_Customers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Tables'
ALTER TABLE [dbo].[Tables]
ADD CONSTRAINT [PK_Tables]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Orders'
ALTER TABLE [dbo].[Orders]
ADD CONSTRAINT [PK_Orders]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TableAssignments'
ALTER TABLE [dbo].[TableAssignments]
ADD CONSTRAINT [PK_TableAssignments]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [Quantity_Id] in table 'Inventories'
ALTER TABLE [dbo].[Inventories]
ADD CONSTRAINT [FK_QuantityInventory]
    FOREIGN KEY ([Quantity_Id])
    REFERENCES [dbo].[Quantities]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_QuantityInventory'
CREATE INDEX [IX_FK_QuantityInventory]
ON [dbo].[Inventories]
    ([Quantity_Id]);
GO

-- Creating foreign key on [Role_Id] in table 'Employees1'
ALTER TABLE [dbo].[Employees]
ADD CONSTRAINT [FK_RoleEmployees]
    FOREIGN KEY ([Role_Id])
    REFERENCES [dbo].[Roles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RoleEmployees'
CREATE INDEX [IX_FK_RoleEmployees]
ON [dbo].[Employees]
    ([Role_Id]);
GO

-- Creating foreign key on [Id] in table 'Orders'
ALTER TABLE [dbo].[Orders]
ADD CONSTRAINT [FK_OrderMenu]
    FOREIGN KEY ([Menu_Id])
    REFERENCES [dbo].[Menus]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

CREATE INDEX [IX_FK_OrdersMenu]
ON [dbo].[Orders]
    ([Menu_Id]);
GO

ALTER TABLE [dbo].[Orders]
ADD CONSTRAINT [FK_OrderTableAssignment]
    FOREIGN KEY ([TableAssignment_Id])
    REFERENCES [dbo].[TableAssignments]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

CREATE INDEX [IX_FK_OrdersTableAssignment]
ON [dbo].[Orders]
    ([TableAssignment_Id]);
GO

-- Creating foreign key on [Customers_Id] in table 'Tables'
ALTER TABLE [dbo].[TableAssignments]
ADD CONSTRAINT [FK_TableAssignmentsCustomer]
    FOREIGN KEY ([Customer_Id])
    REFERENCES [dbo].[Customers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TablesCustomer'
CREATE INDEX [IX_FK_TableAssignmentsCustomer]
ON [dbo].[TableAssignments]
    ([Customer_Id]);
GO

-- Creating foreign key on [Employee_Id] in table 'TableAssignments'
ALTER TABLE [dbo].[TableAssignments]
ADD CONSTRAINT [FK_EmployeeTableAssignment]
    FOREIGN KEY ([Employee_Id])
    REFERENCES [dbo].[Employees]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_EmployeeTableAssignment'
CREATE INDEX [IX_FK_EmployeeTableAssignment]
ON [dbo].[TableAssignments]
    ([Employee_Id]);
GO


-- Creating foreign key on [TableAssignments_Id] in table 'Tables'
ALTER TABLE [dbo].[TableAssignments]
ADD CONSTRAINT [FK_TableAssignmentsTable]
    FOREIGN KEY ([Table_Id])
    REFERENCES [dbo].[Tables]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TablesTableAssignment'
CREATE INDEX [IX_FK_TableAssignmentsTable]
ON [dbo].[TableAssignments]
    ([Table_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------