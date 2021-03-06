USE [contactos]
GO
/****** Object:  Table [dbo].[datos]    Script Date: 29-07-2019 22:11:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[datos](
	[nombre] [varchar](50) NULL,
	[estado] [bit] NULL
) ON [PRIMARY]
GO

/****** Object:  Data [dbo].[datos]    Script Date: 29-07-2019 22:11:01 ******/

GO

INSERT INTO [dbo].[datos]
           ([nombre]
           ,[estado])
     VALUES
           ('Juan'
           ,1)
GO

GO

INSERT INTO [dbo].[datos]
           ([nombre]
           ,[estado])
     VALUES
           ('Agustin'
           ,1)
GO
/****** Object:  StoredProcedure [dbo].[spRec_contactos_ObtieneDatosPorEstado]    Script Date: 29-07-2019 22:11:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Mora
-- Create date: 2019-07-29
-- Description:	Retorna los datos de un usuario
-- =============================================
CREATE PROCEDURE [dbo].[spRec_contactos_ObtieneDatosPorEstado] 
	@estado bit
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM datos WHERE estado = @estado
END
GO
