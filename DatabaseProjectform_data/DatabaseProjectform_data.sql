CREATE TABLE [dbo].[users] (
    [ID]            INT           IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [first_name]    VARCHAR (255) DEFAULT (NULL) NULL,
    [last_name]     VARCHAR (255) DEFAULT (NULL) NULL,
    [email_address] VARCHAR (255) DEFAULT (NULL) NULL
);

GO